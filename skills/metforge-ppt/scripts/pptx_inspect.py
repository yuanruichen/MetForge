#!/usr/bin/env python3
"""Inspect OOXML packages and preserved template design without Office."""
import argparse
import hashlib
import json
import posixpath
import re
import urllib.parse
import xml.etree.ElementTree as ET
from pathlib import Path
from zipfile import ZipFile

NS={"p":"http://schemas.openxmlformats.org/presentationml/2006/main",
    "a":"http://schemas.openxmlformats.org/drawingml/2006/main",
    "r":"http://schemas.openxmlformats.org/officeDocument/2006/relationships"}


def inspect(presentation, template=None):
    errors=[]
    with ZipFile(presentation) as z:
        names=z.namelist()
        if len(names)!=len(set(names)):
            errors.append("Duplicate package entries")
        if z.testzip():
            errors.append("ZIP CRC failure")
        for name in names:
            if not name.endswith((".xml",".rels")):
                continue
            try:
                doc=ET.fromstring(z.read(name))
            except ET.ParseError as e:
                errors.append(f"Malformed XML {name}: {e}")
                continue
            if name.endswith(".rels"):
                parent=posixpath.dirname(posixpath.dirname(name)) if name!="_rels/.rels" else ""
                relids=set()
                for r in doc:
                    if r.get("Id") in relids:
                        errors.append(f"Duplicate relationship {name}: {r.get('Id')}")
                    relids.add(r.get("Id"))
                    if r.get("TargetMode")=="External":
                        continue
                    target=urllib.parse.unquote(r.get("Target","").split("#")[0])
                    target=target.lstrip("/") if target.startswith("/") else posixpath.normpath(posixpath.join(parent,target))
                    if target not in names:
                        errors.append(f"Missing relationship target {name}: {target}")
        p=ET.fromstring(z.read("ppt/presentation.xml"));dim=p.find("p:sldSz",NS)
        cx,cy=int(dim.get("cx")),int(dim.get("cy"))
        rels={r.get("Id"):r.get("Target") for r in ET.fromstring(z.read("ppt/_rels/presentation.xml.rels"))}
        slides=[]
        for i,sid in enumerate(p.findall("p:sldIdLst/p:sldId",NS),1):
            target=rels[sid.get("{"+NS["r"]+"}id")]
            name=target.lstrip("/") if target.startswith("/") else posixpath.normpath("ppt/"+target)
            root=ET.fromstring(z.read(name));shapes=[]
            for s in root.findall("p:cSld/p:spTree/*",NS):
                xf=s.find("p:spPr/a:xfrm",NS)
                if xf is None:
                    xf=s.find("p:xfrm",NS)
                if xf is None:
                    continue
                off,ext=xf.find("a:off",NS),xf.find("a:ext",NS)
                if off is None or ext is None:
                    continue
                x,y,w,h=[int(n.get(k)) for n,k in [(off,"x"),(off,"y"),(ext,"cx"),(ext,"cy")]]
                if min(x,y)<-100 or x+w>cx+100 or y+h>cy+100:
                    errors.append(f"Slide {i}: top-level shape outside slide")
                shapes.append({"type":s.tag.split("}")[-1],"box_inches":[v/914400 for v in [x,y,w,h]]})
            slides.append({"slide":i,"part":name,"text":[t.text or "" for t in root.findall(".//a:t",NS)],
                           "fonts":sorted({n.get("typeface") for n in root.findall(".//a:latin",NS)}),
                           "shapes":shapes})
        retained={}
        if template:
            with ZipFile(template) as t:
                for n in t.namelist():
                    if not n.endswith("/") and re.match(r"ppt/(slideMasters|slideLayouts|theme|notesMasters)/",n):
                        retained[n]=n in names and z.read(n)==t.read(n)
                        if not retained[n]:
                            errors.append(f"Template part changed/missing: {n}")
            ct=ET.fromstring(z.read("[Content_Types].xml"))
            main=next(n for n in ct if n.get("PartName")=="/ppt/presentation.xml")
            if main.get("ContentType")!="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":
                errors.append("Final package is not a normal PPTX main content type")
    return {"file":str(presentation),"sha256":hashlib.sha256(Path(presentation).read_bytes()).hexdigest(),
            "dimensions_emu":[cx,cy],"slides":slides,"preserved_template_parts":retained,
            "errors":errors,"status":"PASS" if not errors else "FAIL",
            "limits":"Geometry/XML do not verify visual fit, rendering fidelity or scientific claims."}


if __name__=="__main__":
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument("presentation",type=Path)
    ap.add_argument("--template",type=Path);ap.add_argument("--json",type=Path);args=ap.parse_args()
    result=inspect(args.presentation,args.template)
    if args.json:
        args.json.parent.mkdir(parents=True,exist_ok=True);args.json.write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n")
    print(json.dumps({"status":result["status"],"slides":len(result["slides"]),"errors":result["errors"]},ensure_ascii=False))
    raise SystemExit(bool(result["errors"]))

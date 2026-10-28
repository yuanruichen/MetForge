#!/usr/bin/env python3
"""Resolve/register a private PPT template; never upload the supplied asset."""
import argparse
import hashlib
import json
import os
import shutil
from pathlib import Path
from zipfile import ZipFile


def checked(path):
    p=Path(path).expanduser().resolve()
    with ZipFile(p) as z:
        for name in ["ppt/presentation.xml","[Content_Types].xml"]:
            z.getinfo(name)
        if z.testzip():
            raise ValueError("Template ZIP integrity check failed")
    return p


def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument("template",nargs="?",type=Path)
    ap.add_argument("--register",type=Path)
    ap.add_argument("--asset-dir",type=Path,help="Override the local private asset directory")
    ap.add_argument("--json",action="store_true")
    args=ap.parse_args()
    private=args.asset_dir or Path(__file__).resolve().parents[2]/".metforge-assets/ppt"
    default=private/"default.potx"
    if args.register:
        src=checked(args.register);private.mkdir(parents=True,exist_ok=True)
        if src!=default.resolve():
            shutil.copy2(src,default)
        result=checked(default)
    else:
        explicit=args.template or os.environ.get("METFORGE_PPT_TEMPLATE")
        bundled=Path(__file__).resolve().parents[1]/"assets/Academic_Minimal_Final.potx"
        if explicit:
            result=checked(explicit)
        elif default.exists():
            result=checked(default)
        elif bundled.exists():
            result=checked(bundled)
        else:
            raise SystemExit("No private template: supply a path, set METFORGE_PPT_TEMPLATE, or register a local template.")
    print(json.dumps({"template":str(result),"sha256":hashlib.sha256(result.read_bytes()).hexdigest(),"private":True}) if args.json else result)


if __name__=="__main__":
    main()

/* Preserve a template's design while replacing its illustrative slide content. */
'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const JSZip=require('jszip');
const {DOMParser,XMLSerializer}=require('@xmldom/xmldom');
const NS={p:'http://schemas.openxmlformats.org/presentationml/2006/main',a:'http://schemas.openxmlformats.org/drawingml/2006/main',r:'http://schemas.openxmlformats.org/officeDocument/2006/relationships',rel:'http://schemas.openxmlformats.org/package/2006/relationships',ct:'http://schemas.openxmlformats.org/package/2006/content-types'};
const parse=s=>new DOMParser().parseFromString(s,'application/xml');
const xml=d=>new XMLSerializer().serializeToString(d);
const all=(d,ns,name)=>Array.from(d.getElementsByTagNameNS(ns,name));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
async function applyTemplate({generated,template,output,layouts=[]}){
 if([template,generated].some(p=>path.resolve(p)===path.resolve(output)))throw Error('Output must preserve both inputs.');
 const original=fs.readFileSync(template),originalHash=sha(original);
 const base=await JSZip.loadAsync(original),gen=await JSZip.loadAsync(fs.readFileSync(generated));
 const gp=parse(await gen.file('ppt/presentation.xml').async('string'));
 const gr=parse(await gen.file('ppt/_rels/presentation.xml.rels').async('string'));
 const bp=parse(await base.file('ppt/presentation.xml').async('string'));
 const br=parse(await base.file('ppt/_rels/presentation.xml.rels').async('string'));
 const dims=d=>all(d,NS.p,'sldSz')[0];
 for(const k of ['cx','cy'])if(dims(bp).getAttribute(k)!==dims(gp).getAttribute(k))throw Error('Template/generated dimensions differ.');
 const ordered=all(gp,NS.p,'sldId').map(n=>{
  const rid=n.getAttributeNS(NS.r,'id'),rel=all(gr,NS.rel,'Relationship').find(q=>q.getAttribute('Id')===rid);
  if(!rel)throw Error('Missing generated slide relationship '+rid);
  const t=rel.getAttribute('Target');return t.startsWith('/')?t.slice(1):path.posix.normalize('ppt/'+t);
 });
 if(!ordered.length)throw Error('Generated presentation has no slides.');
 if(layouts.length&&layouts.length!==ordered.length)throw Error('Layout count differs from slide count.');
 const protectedParts=Object.keys(base.files).filter(n=>!base.files[n].dir&&/^ppt\/(slideMasters|slideLayouts|theme|notesMasters)\//.test(n));
 const hashes={};for(const n of protectedParts)hashes[n]=sha(await base.file(n).async('nodebuffer'));
 const masterMedia=new Set();
 for(const n of protectedParts.filter(n=>n.endsWith('.rels'))){
  const r=parse(await base.file(n).async('string'));
  for(const q of all(r,NS.rel,'Relationship'))if(q.getAttribute('TargetMode')!=='External'&&q.getAttribute('Type').endsWith('/image'))masterMedia.add(path.posix.normalize(path.posix.join(path.posix.dirname(path.posix.dirname(n)),q.getAttribute('Target'))));
 }
 const rename=new Map();
 for(const n of Object.keys(gen.files).filter(n=>!gen.files[n].dir&&n.startsWith('ppt/media/'))){
  let dst='ppt/media/metforge_'+path.posix.basename(n);
  while(base.file(dst)||Array.from(rename.values()).includes(dst))dst='ppt/media/m_'+path.posix.basename(dst);
  rename.set(n,dst);
 }
 for(const n of Object.keys(base.files)){
  if(/^ppt\/(slides|notesSlides|charts|embeddings)\//.test(n))base.remove(n);
  else if(n.startsWith('ppt/media/')&&!masterMedia.has(n))base.remove(n);
 }
 for(const n of Object.keys(gen.files)){
  if(gen.files[n].dir||!/^ppt\/(slides|notesSlides|media|charts|embeddings)\//.test(n))continue;
  let bytes=await gen.file(n).async('nodebuffer');
  if(/^ppt\/slides\/slide\d+\.xml$/.test(n)){
   const d=parse(bytes.toString('utf8'));
   // Explicit paragraph defaults retain the generated run style and give OOXML
   // viewers the correct multiline advance instead of an inherited small font.
   for(const p of all(d,NS.a,'p')){
    let pp=Array.from(p.childNodes).find(q=>q.localName==='pPr');
    const run=all(p,NS.a,'rPr')[0]||all(p,NS.a,'endParaRPr')[0];
    if(!run)continue;
    if(!pp){pp=d.createElementNS(NS.a,'a:pPr');p.insertBefore(pp,p.firstChild);}
    if(!all(pp,NS.a,'defRPr').length){
     const def=d.createElementNS(NS.a,'a:defRPr');
     for(const a of Array.from(run.attributes))if(!['lang','dirty','altLang'].includes(a.name))def.setAttribute(a.name,a.value);
     for(const c of Array.from(run.childNodes))def.appendChild(c.cloneNode(true));
     pp.appendChild(def);
    }
   }
   bytes=Buffer.from(xml(d));
  }
  if(n.endsWith('.rels')){
   const r=parse(bytes.toString('utf8')),parent=path.posix.dirname(path.posix.dirname(n));
   for(const q of all(r,NS.rel,'Relationship'))if(q.getAttribute('TargetMode')!=='External'){
    const dest=path.posix.normalize(path.posix.join(parent,q.getAttribute('Target')));
    if(rename.has(dest))q.setAttribute('Target',path.posix.relative(parent,rename.get(dest)));
   }
   bytes=Buffer.from(xml(r));
  }
  base.file(rename.get(n)||n,bytes);
 }
 for(let i=0;i<ordered.length;i++){
  const l=layouts[i]||3;if(!base.file('ppt/slideLayouts/slideLayout'+l+'.xml'))throw Error('Unknown template layout '+l);
  const n=path.posix.dirname(ordered[i])+'/_rels/'+path.posix.basename(ordered[i])+'.rels';
  const r=parse(await base.file(n).async('string'));
  const q=all(r,NS.rel,'Relationship').find(x=>x.getAttribute('Type')===NS.r+'/slideLayout');
  if(!q)throw Error('Slide has no layout '+ordered[i]);q.setAttribute('Target','../slideLayouts/slideLayout'+l+'.xml');base.file(n,xml(r));
 }
 const ids=all(bp,NS.p,'sldIdLst')[0];while(ids.firstChild)ids.removeChild(ids.firstChild);
 all(br,NS.rel,'Relationship').filter(q=>q.getAttribute('Type')===NS.r+'/slide').forEach(q=>q.parentNode.removeChild(q));
 for(let i=0;i<ordered.length;i++){
  let id='rIdMetforge'+(i+1);while(all(br,NS.rel,'Relationship').some(q=>q.getAttribute('Id')===id))id+='x';
  const n=bp.createElementNS(NS.p,'p:sldId');n.setAttribute('id',String(256+i));n.setAttributeNS(NS.r,'r:id',id);ids.appendChild(n);
  const q=br.createElementNS(NS.rel,'Relationship');q.setAttribute('Id',id);q.setAttribute('Type',NS.r+'/slide');q.setAttribute('Target',ordered[i].slice(4));br.documentElement.appendChild(q);
 }
 base.file('ppt/presentation.xml',xml(bp));base.file('ppt/_rels/presentation.xml.rels',xml(br));
 const ct=parse(await base.file('[Content_Types].xml').async('string'));
 all(ct,NS.ct,'Override').filter(q=>/^\/ppt\/(slides|notesSlides|charts|embeddings)\//.test(q.getAttribute('PartName'))).forEach(q=>q.parentNode.removeChild(q));
 const gct=parse(await gen.file('[Content_Types].xml').async('string'));
 for(const q of all(gct,NS.ct,'Override'))if(/^\/ppt\/(slides|notesSlides|charts|embeddings)\//.test(q.getAttribute('PartName')))ct.documentElement.appendChild(ct.importNode(q,true));
 for(const q of all(gct,NS.ct,'Default'))if(!all(ct,NS.ct,'Default').some(n=>n.getAttribute('Extension')===q.getAttribute('Extension')))ct.documentElement.appendChild(ct.importNode(q,true));
 all(ct,NS.ct,'Override').find(q=>q.getAttribute('PartName')==='/ppt/presentation.xml').setAttribute('ContentType','application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml');
 base.file('[Content_Types].xml',xml(ct));
 for(const n of ['docProps/core.xml','docProps/app.xml'])if(gen.file(n))base.file(n,await gen.file(n).async('nodebuffer'));
 for(const [n,h]of Object.entries(hashes))if(sha(await base.file(n).async('nodebuffer'))!==h)throw Error('Template part changed '+n);
 if(sha(fs.readFileSync(template))!==originalHash)throw Error('Source template changed.');
 fs.mkdirSync(path.dirname(path.resolve(output)),{recursive:true});fs.writeFileSync(output,await base.generateAsync({type:'nodebuffer',compression:'DEFLATE'}));
 return{slides:ordered.length,template_sha256:originalHash,preserved_template_parts:hashes,output_sha256:sha(fs.readFileSync(output))};
}
module.exports={applyTemplate};
if(require.main===module){
 const arg=n=>{const i=process.argv.indexOf(n);if(i<0)throw Error('Missing '+n);return process.argv[i+1]};
 applyTemplate({generated:arg('--generated'),template:arg('--template'),output:arg('--out')}).then(r=>console.log(JSON.stringify(r,null,2))).catch(e=>{console.error(e.message);process.exit(1)});
}

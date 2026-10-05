import fs from 'node:fs';
// Internal-link audit: node scripts/audit-links.mjs [out.json]
// Prints per-post inbound/outbound counts and flags broken in-body links.
const dir=new URL('../src/content/blog/', import.meta.url).pathname;
const posts={};
for(const f of fs.readdirSync(dir)){
  const t=fs.readFileSync(dir+f,'utf8'); const slug=f.replace(/\.mdx?$/,'');
  if(/^draft: true/m.test(t)) continue;
  const fm=t.split('\n---\n')[0]; const body=t.slice(fm.length+5);
  const date=fm.match(/^pubDate: (\S+)/m)[1]; const title=fm.match(/^title: "(.*)"/m)[1];
  const cat=fm.match(/^category: "(.*)"/m)[1]; const tags=fm.match(/^tags: (.*)/m)[1];
  // locate links with section + paragraph index
  const lines=body.split('\n'); let sec='(intro)'; let para=0; const links=[];
  for(const l of lines){ if(/^##+ /.test(l)){sec=l.replace(/^#+ /,'');} if(l.trim()&&!l.startsWith('#'))para++;
    for(const m of l.matchAll(/\[([^\]]+)\]\((\/blog\/[^)#]+)\/?\)/g)) links.push({anchor:m[1],to:m[2].replace(/^\/blog\//,'').replace(/\/$/,''),sec,para});}
  const words=body.replace(/<[^>]+>/g,'').split(/\s+/).length;
  posts[slug]={slug,date,title,cat,tags,words,links};
}
const inbound={}; for(const s in posts) inbound[s]=[];
for(const p of Object.values(posts)) for(const l of p.links){ if(inbound[l.to]) inbound[l.to].push({from:p.slug,anchor:l.anchor}); else console.log('BROKEN',p.slug,'->',l.to);}
if(process.argv[2]) fs.writeFileSync(process.argv[2],JSON.stringify({posts,inbound},null,1));
const rows=Object.values(posts).sort((a,b)=>a.date.localeCompare(b.date));
for(const p of rows) console.log(p.date,p.slug.padEnd(46),'out',String(p.links.length).padStart(2),'in',String(inbound[p.slug].length).padStart(2),'uniqTargets',new Set(p.links.map(l=>l.to)).size, p.cat);

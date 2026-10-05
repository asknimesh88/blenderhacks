// Fails the build if any page links to an internal URL that wasn't built
// (e.g. a scheduled or renamed post).
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const pages = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
};
walk(dist);

const exists = (href) => {
  const clean = decodeURI(href.split(/[?#]/)[0]);
  const p = path.join(dist, clean);
  return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, 'index.html')));
};

const broken = [];
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
    if (!exists(href)) broken.push(`${path.relative(dist, page)} -> ${href}`);
  }
}
if (broken.length) {
  console.error(`Broken internal links (${broken.length}):\n${[...new Set(broken)].join('\n')}`);
  process.exit(1);
}
console.log(`Internal links OK (${pages.length} pages checked).`);

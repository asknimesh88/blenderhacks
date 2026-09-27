// /sitemap.xml: many tools (and an old Search Console entry for this domain)
// look here, so serve a sitemap index pointing at the generated sitemap files.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = new URL('/', site).toString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${base}sitemap-0.xml</loc></sitemap>
</sitemapindex>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

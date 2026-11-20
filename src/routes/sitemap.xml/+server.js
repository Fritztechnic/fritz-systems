export const prerender = true;

import { posts } from '#lib/posts.js';

const site = 'https://fritz.systems';
const pages = ['/', '/projekte/', '/blog/', '/ueber-mich/', '/kontakt/'];

export const GET = () => {
  const urls = [...pages, ...posts.map((p) => `/blog/${p.slug}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site}${u}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};

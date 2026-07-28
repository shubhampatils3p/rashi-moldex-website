const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'public', 'config.json');
const outPath = path.join(__dirname, 'public', 'sitemap.xml');
const baseUrl = 'https://rashimoldex.com';

async function generate() {
  const raw = fs.readFileSync(configPath, 'utf-8');
  const config = JSON.parse(raw);
  const pages = [
    '/',
    '/about',
    '/products',
    '/contact',
  ];

  (config.products || []).forEach((p) => pages.push(`/products/${p.slug}`));

  const urls = pages.map((p) => `  <url>\n    <loc>${baseUrl}${p}</loc>\n  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  fs.writeFileSync(outPath, xml, 'utf-8');
  console.log('Sitemap written to', outPath);
}

generate();

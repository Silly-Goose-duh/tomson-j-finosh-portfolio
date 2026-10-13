import { createServer } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distIndex = path.join(projectRoot, 'dist', 'index.html');
const vite = await createServer({
  configFile: path.join(projectRoot, 'vite.config.ts'),
  mode: 'production',
  appType: 'custom',
  server: { middlewareMode: true },
  logLevel: 'error',
});

try {
  const [{ renderApp }, { content }] = await Promise.all([
    vite.ssrLoadModule('/src/entry-server.tsx'),
    vite.ssrLoadModule('/src/content/content.ts'),
  ]);
  let html = await readFile(distIndex, 'utf8');
  const rendered = renderApp();
  html = html.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`);
  const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const replaceMeta = (pattern, replacement) => { html = html.replace(pattern, replacement); };

  replaceMeta(/<title>[^<]*<\/title>/, `<title>${esc(content.seo.title)}</title>`);
  replaceMeta(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(content.seo.description)}" />`);
  replaceMeta(/<meta name="keywords" content="[^"]*"\s*\/>/, `<meta name="keywords" content="${esc(content.seo.keywords.join(', '))}" />`);
  replaceMeta(/<meta property="og:site_name" content="[^"]*"\s*\/>/, `<meta property="og:site_name" content="${esc(content.seo.siteName)}" />`);
  replaceMeta(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${esc(content.seo.title)}" />`);
  replaceMeta(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(content.seo.description)}" />`);
  replaceMeta(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${esc(content.seo.title)}" />`);
  replaceMeta(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${esc(content.seo.description)}" />`);

  const configuredUrl = process.env.PUBLIC_SITE_URL || content.seo.siteUrl;
  const siteUrl = configuredUrl ? new URL(configuredUrl).origin.replace(/\/$/, '') : '';
  const shareImage = /^https?:\/\//i.test(content.seo.ogImage)
    ? content.seo.ogImage
    : siteUrl ? new URL(content.seo.ogImage, `${siteUrl}/`).toString() : '';
  if (shareImage) {
    const imageTags = `<meta property="og:image" content="${esc(shareImage)}" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="og:image:type" content="image/png" />\n    <meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:image" content="${esc(shareImage)}" />`;
    html = html.replace('</head>', `${imageTags}\n  </head>`);
  }

  const sameAs = content.intro.links.filter((link) => link.kind === 'github').map((link) => link.href);
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: content.brand.name,
    jobTitle: content.seo.personJobTitle,
    sameAs,
    ...(siteUrl ? { url: `${siteUrl}/` } : {}),
  };
  const schemaTag = `<script type="application/ld+json">${JSON.stringify(person).replaceAll('<', '\\u003c')}</script>`;
  html = html.replace('</head>', `${schemaTag}\n  </head>`);

  if (siteUrl) {
    const canonical = `<link rel="canonical" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/" />`;
    html = html.replace('</head>', `${canonical}\n    </head>`);
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc></url></urlset>`;
    await writeFile(path.join(projectRoot, 'dist', 'sitemap.xml'), sitemap);
    await writeFile(path.join(projectRoot, 'dist', 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/*\nSitemap: ${siteUrl}/sitemap.xml\n`);
  }

  await writeFile(distIndex, html);
  console.log(`Prerendered / with ${rendered.length.toLocaleString()} characters of HTML${siteUrl ? ` for ${siteUrl}` : '; canonical, sitemap and robots origin entries are deferred to the managed gateway until PUBLIC_SITE_URL is configured'}.`);
} finally {
  await vite.close();
}

import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(projectRoot, 'public', 'portfolio.pdf');
const url = process.env.PDF_URL || 'https://tomson-j-finosh.vercel.app';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

try {
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  if (!response || !response.ok()) throw new Error(`Could not load ${url}: ${response?.status() ?? 'no response'}`);
  await page.waitForTimeout(2200);
  await page.emulateMedia({ media: 'screen' });
  await page.addStyleTag({ content: `
    .preloader, .site-header, .skip-link { display: none !important; }
    *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }
    [data-reveal] { opacity: 1 !important; transform: none !important; }
    html, body { width: 1440px !important; min-width: 1440px !important; overflow: visible !important; }
  ` });
  const height = await page.evaluate(() => Math.ceil(document.documentElement.scrollHeight));
  await page.pdf({
    path: output,
    printBackground: true,
    width: '1440px',
    height: `${height}px`,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    pageRanges: '1',
  });
  console.log(`Generated one-page portfolio PDF at ${output} (${height}px tall).`);
} finally {
  await browser.close();
}

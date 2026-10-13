import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

// Run after local background removal: node scripts/prepare-cutout.mjs <transparent-png>
const input = process.argv[2];
if (!input) throw new Error('Supply the path to a background-removed PNG.');
const image = sharp(input);
const metadata = await image.metadata();
const output = fileURLToPath(new URL('../public/portrait-cutout.webp', import.meta.url));
if (!metadata.hasAlpha) throw new Error('The cutout must contain transparency.');
await image.trim({ background: '#00000000', threshold: 20 })
  .resize({ height: 1400, withoutEnlargement: true })
  .webp({ quality: 88, alphaQuality: 100 })
  .toFile(output);
console.log(await sharp(output).metadata());

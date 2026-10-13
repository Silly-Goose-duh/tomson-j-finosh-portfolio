import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

// Source: the owner's public blog. The mask only removes the background;
// no facial or body features are generated or changed.
const response = await fetch('https://tommysblog.vercel.app/images/profile.jpg');
if (!response.ok) throw new Error(`Portrait download failed: ${response.status}`);
const source = Buffer.from(await response.arrayBuffer());
const width = 753;
const height = 1000;
const silhouette = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 1000 L8 942 Q18 833 60 735 Q80 684 140 667 L276 631 Q300 615 305 590 L304 558 Q281 537 280 501 Q268 478 276 451 L274 422 Q267 362 296 326 Q325 291 362 286 Q413 268 464 291 Q506 303 519 345 Q528 378 518 420 L515 460 Q521 480 511 504 Q510 544 489 567 L487 608 Q488 630 521 646 L616 685 Q655 695 681 734 Q708 778 714 857 L718 1000 Z"/></svg>`;
await sharp(source).resize(width, height, { fit: 'fill' }).grayscale()
  .composite([{ input: Buffer.from(silhouette), blend: 'dest-in' }])
  .extract({ left: 0, top: 267, width, height: 733 })
  .webp({ quality: 86 }).toFile(fileURLToPath(new URL('../public/portrait.webp', import.meta.url)));
console.log('Prepared locally hosted monochrome portrait from the owner’s blog.');

import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '..', 'public', 'assets');

// Brand colors
const bgColor = '#100e0b';  // --ink
const textColor = '#f3ecd9'; // --bone

// Create SVG with "LM" initials
const createIconSvg = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${bgColor}"/>
  <text
    x="50%"
    y="54%"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="${size * 0.4}px"
    font-weight="800"
    fill="${textColor}"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="-0.02em"
  >LM</text>
</svg>`;

async function generateIcons() {
  const sizes = [192, 512];

  for (const size of sizes) {
    const svg = createIconSvg(size);
    const outputPath = join(assetsDir, `icon-${size}.png`);

    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);

    console.log(`Created: icon-${size}.png`);
  }

  // Also create a proper favicon
  const faviconSvg = createIconSvg(128);
  const faviconPath = join(__dirname, '..', 'public', 'favicon-lm.svg');
  writeFileSync(faviconPath, createIconSvg(128).trim());
  console.log('Created: favicon-lm.svg');
}

generateIcons().catch(console.error);

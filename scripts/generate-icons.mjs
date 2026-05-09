import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const assetsDir = join(publicDir, 'assets');

// All icons (PWA + favicon) come from the brand logo with transparent corners.
// Do NOT use icon-source.png as a source — it has a white background, which
// regenerates icon-192/512 with white corners and breaks the manifest.
const faviconSource = join(assetsDir, 'favicon-source.png');

// Minimal multi-size ICO encoder (PNG-encoded ICO).
function buildIco(pngEntries) {
  const headerSize = 6;
  const entrySize = 16;
  let dataOffset = headerSize + entrySize * pngEntries.length;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngEntries.length, 4);

  const dirEntries = [];
  for (const { size, data } of pngEntries) {
    const e = Buffer.alloc(entrySize);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(dataOffset, 12);
    dirEntries.push(e);
    dataOffset += data.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngEntries.map(p => p.data)]);
}

async function generateIcons() {
  // PWA / apple-touch icons (transparent corners from brand logo)
  for (const size of [192, 512]) {
    const outputPath = join(assetsDir, `icon-${size}.png`);
    await sharp(faviconSource)
      .resize(size, size, { kernel: 'lanczos3' })
      .png()
      .toFile(outputPath);
    console.log(`Created: assets/icon-${size}.png`);
  }

  // Favicons from brand logo (already RGBA with transparent corners).
  // Pre-render a sharp 256px master, then downscale per size with lanczos3 for crisp edges.
  const masterBuffer = await sharp(faviconSource)
    .resize(256, 256, { kernel: 'lanczos3' })
    .png()
    .toBuffer();

  const faviconSizes = [16, 32, 48];
  const pngEntries = [];

  for (const size of faviconSizes) {
    const outputPath = join(publicDir, `favicon-${size}.png`);
    const data = await sharp(masterBuffer)
      .resize(size, size, { kernel: 'lanczos3' })
      .png()
      .toBuffer();
    writeFileSync(outputPath, data);
    pngEntries.push({ size, data });
    console.log(`Created: favicon-${size}.png`);
  }

  // Multi-size favicon.ico (16, 32, 48)
  const icoBuffer = buildIco(pngEntries);
  writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Created: favicon.ico (16, 32, 48)');
}

generateIcons().catch(err => {
  console.error(err);
  process.exit(1);
});

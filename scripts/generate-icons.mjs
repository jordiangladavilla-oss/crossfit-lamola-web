import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '..', 'public', 'assets');
const sourceIcon = join(assetsDir, 'icon-source.png');

async function generateIcons() {
  const sizes = [192, 512];

  for (const size of sizes) {
    const outputPath = join(assetsDir, `icon-${size}.png`);

    await sharp(sourceIcon)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`Created: icon-${size}.png`);
  }

  // Create favicon (32x32 for best browser compatibility)
  const faviconPath = join(__dirname, '..', 'public', 'favicon.png');
  await sharp(sourceIcon)
    .resize(32, 32)
    .png()
    .toFile(faviconPath);
  console.log('Created: favicon.png');
}

generateIcons().catch(console.error);

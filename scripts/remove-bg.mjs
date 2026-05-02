import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '..', 'public', 'assets');
const sourceIcon = join(assetsDir, 'icon-source.png');

async function removeWhiteBackground() {
  // Read the image and get raw pixel data
  const image = sharp(sourceIcon);
  const { data, info } = await image
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  // Process pixels: make white/near-white pixels transparent
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // If pixel is white or near-white (threshold 240), make it transparent
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0; // Set alpha to 0 (transparent)
    }
  }

  // Save the processed image back
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
    .png()
    .toFile(join(assetsDir, 'icon-source-transparent.png'));

  console.log('Created: icon-source-transparent.png');

  // Now generate the PWA icons from the transparent version
  const sizes = [192, 512];
  for (const size of sizes) {
    await sharp(join(assetsDir, 'icon-source-transparent.png'))
      .resize(size, size)
      .png()
      .toFile(join(assetsDir, `icon-${size}.png`));
    console.log(`Created: icon-${size}.png`);
  }

  // Create favicon
  await sharp(join(assetsDir, 'icon-source-transparent.png'))
    .resize(32, 32)
    .png()
    .toFile(join(__dirname, '..', 'public', 'favicon.png'));
  console.log('Created: favicon.png');
}

removeWhiteBackground().catch(console.error);

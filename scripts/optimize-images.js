const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const inputDir = 'src/assets';
  const outputDir = 'src/assets/optimized';
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const files = fs.readdirSync(inputDir).filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    console.log(`Found ${files.length} images to optimize...`);

    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);
      const webpPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      
      const originalSize = fs.statSync(inputPath).size;
      
      // Get file extension
      const ext = path.extname(file).toLowerCase();
      
      let sharpInstance = sharp(inputPath);
      
      // Apply different optimizations based on file type
      if (ext === '.jpg' || ext === '.jpeg') {
        sharpInstance = sharpInstance.jpeg({ 
          quality: 80, 
          progressive: true,
          mozjpeg: true
        });
      } else if (ext === '.png') {
        sharpInstance = sharpInstance.png({ 
          quality: 80,
          compressionLevel: 9,
          progressive: true
        });
      }
      
      // Resize if image is too large (max width 1920px)
      sharpInstance = sharpInstance.resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
      
      // Save optimized version
      await sharpInstance.toFile(outputPath);
      
      // Create WebP version
      await sharp(inputPath)
        .resize(1920, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      const optimizedSize = fs.statSync(outputPath).size;
      const webpSize = fs.statSync(webpPath).size;
      
      console.log(`${file}:`);
      console.log(`  Original: ${(originalSize / 1024).toFixed(2)} KB`);
      console.log(`  Optimized: ${(optimizedSize / 1024).toFixed(2)} KB (${((1 - optimizedSize/originalSize) * 100).toFixed(1)}% reduction)`);
      console.log(`  WebP: ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize/originalSize) * 100).toFixed(1)}% reduction)`);
      console.log('');
    }

    console.log('Image optimization complete!');
    console.log(`Optimized images saved to: ${outputDir}`);

  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();
const fs = require('fs');
const path = require('path');

const portfolioFolder = path.join(__dirname, 'Porfolio');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

fs.readdir(portfolioFolder, (err, files) => {
  if (err) {
    return;
  }

  // Filtriraj samo slike i sortiraj ih
  const imageFiles = files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    })
    .sort()
    .map(file => `Porfolio/${file}`);

  const jsonContent = JSON.stringify(imageFiles, null, 2);
  fs.writeFileSync(
    path.join(__dirname, 'portfolio-images.json'),
    jsonContent
  );
  console.log(` done: ${imageFiles.length}`);
});

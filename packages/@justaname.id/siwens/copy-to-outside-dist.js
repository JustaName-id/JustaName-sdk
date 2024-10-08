const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const targetPath = path.join(__dirname, '..', '..', '..', 'dist/packages/@justaname.id/siwens');

// Create the target directory
fs.mkdirSync(targetPath, { recursive: true });

// Function to copy directory recursively
function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy files and directories
fs.readdirSync(distPath).forEach(file => {
  const srcPath = path.join(distPath, file);
  const destPath = path.join(targetPath, file);

  if (fs.statSync(srcPath).isDirectory()) {
    fs.mkdirSync(destPath, { recursive: true });
    copyDir(srcPath, destPath);
  } else {
    fs.copyFileSync(srcPath, destPath);
  }
});

const fs = require('fs');
const path = require('path');

// Read the original package.json
const packageJson = require('./package.json');

// Modify the paths
packageJson.main = packageJson.main.replace('./dist/', './');
packageJson.module = packageJson.module.replace('./dist/', './');
packageJson.types = packageJson.types.replace('./dist/', './');

if (packageJson.exports) {
  Object.keys(packageJson.exports).forEach((key) => {
    if (typeof packageJson.exports[key] === 'string') {
      packageJson.exports[key] = packageJson.exports[key].replace(
        './dist/',
        './'
      );
    } else if (typeof packageJson.exports[key] === 'object') {
      Object.keys(packageJson.exports[key]).forEach((subKey) => {
        packageJson.exports[key][subKey] = packageJson.exports[key][
          subKey
        ].replace('./dist/', './');
      });
    }
  });
}

// Write the modified package.json to the dist folder
const distPath = path.join(__dirname, 'dist', 'package.json');
fs.writeFileSync(distPath, JSON.stringify(packageJson, null, 2));

fs.copyFileSync(
  path.join(__dirname, 'README.md'),
  path.join(__dirname, 'dist', 'README.md')
);

// I want to delete all .d.ts.map files
const deleteFiles = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      deleteFiles(filePath);
    } else {
      if (filePath.endsWith('.d.ts.map')) {
        fs.unlinkSync(filePath);
      }
    }
  }
};

deleteFiles(path.join(__dirname, 'dist'));

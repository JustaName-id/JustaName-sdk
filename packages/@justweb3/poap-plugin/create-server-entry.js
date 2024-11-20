const fs = require('fs');
const path = require('path');

// Define the paths
const distDir = path.join(__dirname, 'dist');
const serverJsPath = path.join(distDir, 'server.js');
const serverDtsPath = path.join(distDir, 'server.d.ts');

// Content for server.js
const serverJsContent = `export { getPoaps } from './server/getPoaps.js';`;

// Content for server.d.ts
const serverDtsContent = `export { getPoaps } from './server/getPoaps';`;

// Write server.js to dist directory
fs.writeFileSync(serverJsPath, serverJsContent);

// Write server.d.ts to dist directory
fs.writeFileSync(serverDtsPath, serverDtsContent);

console.log(
  'server.js and server.d.ts have been created in the dist directory.'
);

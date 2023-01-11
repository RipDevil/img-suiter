const root = './';
const copyTo = './photos/';
const fs = require('fs');
const path = require('path');

const ignore = [
  'iter_renamer.js',
  'photos',
  'package.json',
  'package-lock.json',
  'node_modules',
  '.git',
  '.gitignore',
  'README.md',
  'index.js',
];

let i = 1;
console.log('<=== Processing has started ===>');
fs.readdirSync(root).forEach((file) => {
  if (ignore.includes(file)) {
    fs.readdirSync(root + file).forEach(async (p) => {
      try {
        if (!p.includes('.zip')) {
          const baseName = p.split('.')[0];
          const filePath = root + file + '/' + baseName;
          const extName = path.extname(root + file + '/' + p).toLowerCase();

          console.log(`${i} --- ${baseName} is being processed...`);
          fs.copyFileSync(filePath + extName, copyTo + i + extName);
        }
      } catch (err) {
        console.error(err);
      }

      i++;
    });
  }
});
console.log('<=== Processing has ended ===>');

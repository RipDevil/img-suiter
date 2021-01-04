const root = './';
const copyTo = './photos/';
const fs = require('fs');
const convert = require('heic-convert');
const path = require('path');


let i = 1;
console.log('<=== Processing has started ===>');
fs.readdirSync(root).forEach((file) => {
  if (
    file !== 'iter_renamer.js' &&
    file !== 'photos' &&
    file !== 'package.json' &&
    file !== 'package-lock.json' &&
    file !== 'node_modules' &&
    file !== '.git'
  ) {
    fs.readdirSync(root + file).forEach(async (p) => {
      try {
        if (!p.includes('.zip')) {
          const baseName = p.split('.')[0];
          const filePath = root + file + '/' + baseName;
          const extName = path.extname(root + file + '/' + p).toLowerCase();

          console.log(`${i} --- ${baseName} is being processed...`)
          fs.copyFileSync(filePath + extName, copyTo + i + extName);

          // TODO: Needs optimisation for .heic -> .jpg convert
          // if (p.match(/.heic/i)) {
          //   const inputBuffer = fs.readFileSync(filePath + extName);
          //   const savedIdx = i;
          //   convert({
          //     buffer: inputBuffer, // the HEIC file buffer
          //     format: 'JPEG', // output format
          //     quality: 1, // the jpeg compression quality, between 0 and 1
          //   }).then((data) => {
          //     fs.writeFileSync(copyTo + savedIdx + '.jpg', data);
          //   });
          // } else {
          //   fs.copyFileSync(filePath + extName, copyTo + i + extName);
          // }
        }
      } catch (err) {
        console.error(err);
      }

      i++;
    });
  }
});
console.log('<=== Processing has ended ===>');
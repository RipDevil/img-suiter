// Эта версия скрипта для сквозных фотографий импортированных через 3uTools

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
  'index.js.bak'
];

let i = 1;
console.log('<=== Processing has started ===>');
console.log('Reading the root ./');
const files = fs.readdirSync(root);

console.log('Sorting with mtime');
const sortedFiles = files.sort((fileA, fileB) => {
	if (!ignore.includes(fileA) && !ignore.includes(fileB)) {
		return fs.statSync(root + fileA).mtime.getTime() - 
				fs.statSync(root + fileB).mtime.getTime();
	}
})
console.log('Done!');

/*
// debug
console.log('!!! debug !!!');
sortedFiles.forEach((file) => {
	if (!ignore.includes(file)) {
		console.log('!!! '+fs.statSync(root + file).mtime+' : '+file);
	}
})
console.log('^^^ debug ^^^');
console.log('\n');
*/

console.log('mv files');
sortedFiles.forEach((file) => {
  if (!ignore.includes(file) && !file.includes('.zip')) {
  	try {
  		const [baseName, ext] = file.split('.');
  		const filePath = root + file;
  
  		console.log(`${i} --- ${baseName} is being processed...`);
  		fs.copyFileSync(filePath, copyTo + i + '.' + ext);
  	} catch (err) {
  		console.error(err);
  	}
  
  	  i++;
    }
});
console.log('<=== Processing has ended ===>');

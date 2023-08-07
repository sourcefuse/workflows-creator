import * as crypto from 'crypto';
import {ensureDir, readFileSync, writeFileSync} from 'fs-extra';
const {copyFile, rm} = require('fs-extra');
const concat = require('concat');

async function elementsBundler() {
  const space = 2;
  const files = [
    './dist/workflows-element/runtime.js',
    './dist/workflows-element/polyfills.js',
    './dist/workflows-element/main.js',
  ];
  await ensureDir('../workflows-element/dist');
  await concat(files, '../workflows-element/dist/workflows-element.js');
  await copyFile(
    './dist/workflows-element/styles.css',
    '../workflows-element/dist/styles.css',
  );

  await copyFile('./dist/README.md', '../workflows-element/dist/README.md');

  // generate the hash of element file to keep a track of the chnages
  // whenever any changes are made in the library the corresponding js file will
  // resul in changing its hash, so the element will also be published

  const file = '../workflows-element/dist/workflows-element.js';
  const data = readFileSync(file);
  const hash = crypto.createHash('sha256');
  hash.update(data);
  const fileHash = hash.digest('hex');

  //if there will be changes in hash then the element will also be published

  const packageJsonPath = '../workflows-element/package.json';
  const jsonObj = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  jsonObj.hash = fileHash;
  writeFileSync(packageJsonPath, JSON.stringify(jsonObj, null, space));
}

elementsBundler();

import * as crypto from 'crypto';
import {ensureDir, readFileSync, writeFileSync} from 'fs-extra';
const {copyFile, rm} = require('fs-extra');
const concat = require('concat');
async function elementsBundler() {
  const space = 4;
  const files = [
    '../../dist/workflows-element/runtime.js',
    '../../dist/workflows-element/polyfills.js',
    '../../dist/workflows-element/main.js',
  ];
  await ensureDir('../../dist/workflows-element/element');
  await concat(files, '../../dist/workflows-element/element/workflows-element.js');
  await copyFile(
    '../../dist/workflows-element/styles.css',
    '../../dist/workflows-element/element/styles.css',
  );

  await copyFile(
    '../../dist/workflows-creator/README.md',
    '../../dist/workflows-element/element/README.md',
  );

  // whenever any changes are made in the element the corresponding js file will
  // resulting in changing its hash, so the element will also be published

  const file = '../../dist/workflows-element/element/workflows-element.js';
  const data = readFileSync(file);
  const hash = crypto.createHash('sha256');
  hash.update(data);
  const fileHash = hash.digest('hex');

 
  //if there will be changes in hash then the element will also be published

  const packageJsonPath = '../../dist/workflows-creator/package.json';
  const jsonObj = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  jsonObj.hash = fileHash;
  writeFileSync(packageJsonPath, JSON.stringify(jsonObj, null, space));
}

elementsBundler();

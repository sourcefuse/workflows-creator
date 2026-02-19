import * as crypto from 'crypto';
import {
  ensureDir,
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  copyFileSync,
} from 'fs-extra';
import {createWriteStream} from 'fs';

async function elementsBundler() {
  const space = 2;
  const distBase = './projects/workflows-creator/dist/workflows-element';
  const browserDir = `${distBase}/browser`;

  const filesPresent: string[] = [];
  if (existsSync(browserDir)) {
    const all = readdirSync(browserDir);
    const polyfills = all.find((f: string) => /^polyfills(.*)\.js$/.test(f));
    const main = all.find((f: string) => /^main(.*)\.js$/.test(f));
    const runtime = all.find((f: string) => /^runtime(.*)\.js$/.test(f));
    const vendor = all.find((f: string) => /^vendor(.*)\.js$/.test(f));

    if (polyfills) filesPresent.push(`${browserDir}/${polyfills}`);
    if (main) filesPresent.push(`${browserDir}/${main}`);
    if (runtime) filesPresent.push(`${browserDir}/${runtime}`);
    if (vendor) filesPresent.push(`${browserDir}/${vendor}`);
  }

  if (filesPresent.length === 0) {
    console.error('No build JS files found in', browserDir);
    return;
  }

  const outDir = './projects/workflows-element/dist';
  await ensureDir(outDir);

  // concatenate detected files into a single element bundle
  const outFile = `${outDir}/workflows-element.js`;
  const ws = createWriteStream(outFile);
  for (const f of filesPresent) {
    const content = readFileSync(f);
    ws.write(content);
    ws.write('\n');
  }

  // Wait for the stream to finish before continuing
  await new Promise<void>((resolve, reject) => {
    ws.end();
    ws.on('finish', resolve);
    ws.on('error', reject);
  });

  // copy styles if present
  const stylesSrc = `${browserDir}/styles.css`;
  if (existsSync(stylesSrc)) {
    copyFileSync(stylesSrc, `${outDir}/styles.css`);
  }

  // copy README from workflows-creator project
  const readmeSrc = './projects/workflows-creator/README.md';
  if (existsSync(readmeSrc)) {
    copyFileSync(readmeSrc, `${outDir}/README.md`);
  }

  // generate the hash of element file to keep a track of the changes
  const file = `${outDir}/workflows-element.js`;
  const data = readFileSync(file);
  const hash = crypto.createHash('sha256');
  hash.update(data);
  const fileHash = hash.digest('hex');

  // write hash into sibling package.json so publishing can detect changes
  const packageJsonPath = './projects/workflows-element/package.json';
  if (existsSync(packageJsonPath)) {
    const jsonObj = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    jsonObj.hash = fileHash;
    writeFileSync(packageJsonPath, JSON.stringify(jsonObj, null, space));
  } else {
    console.warn('package.json not found at', packageJsonPath);
  }
}

elementsBundler();

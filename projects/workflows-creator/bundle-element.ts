import * as crypto from 'crypto';
import {
  ensureDir,
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  copyFileSync,
  copySync,
} from 'fs-extra';
import {createWriteStream} from 'fs';

// The built JS files to bundle, in load order (polyfills first).
function findBuildFiles(browserDir: string): string[] {
  if (!existsSync(browserDir)) {
    return [];
  }
  const all = readdirSync(browserDir);
  return ['polyfills', 'main', 'runtime', 'vendor']
    .map(name =>
      all.find((f: string) => new RegExp(`^${name}.*\\.js$`).test(f)),
    )
    .filter((f): f is string => !!f)
    .map(f => `${browserDir}/${f}`);
}

async function elementsBundler() {
  const space = 2;
  const distBase = './projects/workflows-creator/dist/workflows-element';
  const browserDir = `${distBase}/browser`;

  const filesPresent = findBuildFiles(browserDir);

  if (filesPresent.length === 0) {
    console.error('No build JS files found in', browserDir);
    return;
  }

  const outDir = './projects/workflows-element/dist';
  await ensureDir(outDir);

  // Concatenate detected files into a single element bundle. The builder emits
  // ES modules, whose top-level declarations are private to the module. Loaded
  // as one classic script they would become globals on the host page (e.g.
  // saxen's `var hasOwnProperty` hoists over window.hasOwnProperty and breaks
  // zone.js), so give each file its own strict-mode function scope.
  const outFile = `${outDir}/workflows-element.js`;
  const ws = createWriteStream(outFile);
  for (const f of filesPresent) {
    const content = readFileSync(f);
    ws.write('(function () {\n"use strict";\n');
    ws.write(content);
    ws.write('\n})();\n');
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

  // copy the icon fonts that styles.css loads from ./media
  const mediaSrc = `${browserDir}/media`;
  if (existsSync(mediaSrc)) {
    copySync(mediaSrc, `${outDir}/media`);
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

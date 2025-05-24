/* eslint-disable no-undef */

import { readdirSync, unlinkSync, writeFile, existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { GetSeeds } from './get-seed.mjs';
for (const seed of GetSeeds()) {
  const pathDir = resolve('database', 'seeds', seed);
  const pathFile = resolve('database', 'seeds', seed, 'index.ts');
  const classNames = [];
  const migrationsFiles = readdirSync(pathDir)
    .filter((f) => f !== 'index.ts')
    .map((f) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [fileName, _] = f.split('.');
      const [timestamp, name] = fileName.split('-');
      const className = name + timestamp;
      classNames.push(className);
      return `import { ${className} } from './${fileName}';\n`;
    });

  if (existsSync(pathFile)) {
    unlinkSync(pathFile);
  }

  const variableName = `${seed.charAt(0).toLocaleUpperCase()}${seed.substring(1, seed.length)}`;
  migrationsFiles.push(`\nexport const Seed${variableName} = [\n  ${classNames.join('[comma]\n  ')}[comma]\n];\n`);
  const data = migrationsFiles
    .toString()
    .replace(/,/gm, '')
    .replace(/(\[comma\])/gm, ',');

  writeFile(pathFile, data, { flag: 'wx', encoding: 'utf-8' }, (err) => {
    if (err !== null) {
      console.log(err);
    }
  });
  console.log('Migration criado com sucesso!');
}

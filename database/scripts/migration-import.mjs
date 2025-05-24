/* eslint-disable no-undef */

import { readdirSync, unlinkSync, writeFile, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const pathDir = resolve('database', 'migrations');
const pathFile = resolve('database', 'migrations', 'index.ts');

const migrationsFiles = readdirSync(pathDir)
  .filter((f) => f !== 'index.ts')
  .map((f) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [name, _] = f.split('.');
    return `export * from './${name}';\n`;
  });

if (existsSync(pathFile)) {
  unlinkSync(pathFile);
}

const data = migrationsFiles.toString().replace(/,/gm, '');
writeFile(pathFile, data, { flag: 'wx' }, (err) => {
  if (err !== null) {
    console.log(err);
  }
});
console.log('Migration criado com sucesso!');

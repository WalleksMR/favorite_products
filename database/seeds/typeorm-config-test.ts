import { DataSource } from 'typeorm';

import * as entities from '@/infrastructure/database/postgres/entities';

import { SeedTest } from './test';
import { env } from '../../src/main/config/environment';

const mode_debugger = env.app.mode_debugger;
const migrations: any[] = [];

if (env.app.seeds.length) {
  for (const seed of env.app.seeds) {
    if (seed === 'test') {
      migrations.push(...SeedTest);
    }
  }
}

export const AppDataSourceTest = new DataSource({
  type: 'postgres',
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.database,
  schema: env.database.schema,
  entities,
  synchronize: false,
  migrations: migrations,
  logger: mode_debugger ? 'advanced-console' : 'simple-console',
  logging: mode_debugger,
  ...(env.IsProduction() && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});

if (env.app.mode_debugger) {
  console.log(
    `\x1b[36m type: "${AppDataSourceTest.options.type}" | host: "${env.database.host}" | port: "${env.database.port}" | schema: "${env.database.schema}" \x1b[0m `,
  );
}

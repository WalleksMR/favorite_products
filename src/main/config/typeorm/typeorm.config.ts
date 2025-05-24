import { DataSource } from 'typeorm';

import * as entities from '@/infrastructure/database/postgres/entities';

import * as migrations from '../../../../database/migrations';
import { env } from '../environment';

const mode_debugger = env.app.mode_debugger;
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.database,
  schema: env.database.schema,
  entities,
  synchronize: false,
  migrations,
  logger: mode_debugger ? 'advanced-console' : 'simple-console',
  logging: mode_debugger,
  ...(env.IsProduction() && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});

if (mode_debugger) {
  console.log(
    `\x1b[36m type: "${AppDataSource.options.type}" | host: "${env.database.host}" | port: "${env.database.port}" | schema: "${env.database.schema}" \x1b[0m `,
  );
}

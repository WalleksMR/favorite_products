import { DataSource } from 'typeorm';

import { env } from '@/main/config/environment';

export const connection = new DataSource({
  type: 'postgres',
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.database,
  schema: 'public',
  ...(env.IsProduction() && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});

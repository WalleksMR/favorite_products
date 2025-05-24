import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as entities from '../../../infrastructure/database/postgres/entities';
import { env } from '../environment';
import { EnvironmentConfigModule } from '../environment/environment.module';

const mode_debugger = env.app.mode_debugger;

export const getTypeOrmModuleOptions = (config: ConfigService): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT'),
    username: config.get<string>('DB_USER'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),
    schema: config.get<string>('DB_SCHEMA'),
    entities,
    synchronize: false,
    migrations: ['dist/database/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'database/migrations',
    },
    logger: mode_debugger ? 'advanced-console' : 'simple-console',
    logging: mode_debugger,
    ...(env.IsProduction() && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}

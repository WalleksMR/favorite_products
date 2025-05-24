import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { env } from './config.environemt';
import { validate } from './validation.environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: env.path,
      validate,
    }),
  ],
  exports: [ConfigModule],
})
export class EnvironmentConfigModule {}

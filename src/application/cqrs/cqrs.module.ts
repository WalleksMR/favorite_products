import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PostgresModule } from '@/infrastructure/database/postgres.module';
import { FakeStoreAPIModule } from '@/infrastructure/gateways/fake-store-api/fake-store-api.module';
import { LoggerModule } from '@/infrastructure/gateways/logger/logger.module';
import { ValidationConfigModule } from '@/infrastructure/gateways/validation';

import { Handlers } from './cqrs';

@Module({
  imports: [CqrsModule, PostgresModule, ValidationConfigModule, LoggerModule, FakeStoreAPIModule],
  providers: [...Handlers],
  exports: [...Handlers],
})
export class CqrsConfigModule {}

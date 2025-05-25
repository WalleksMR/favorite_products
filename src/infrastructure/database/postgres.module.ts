import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigModule } from '@/main/config/typeorm/typeorm.module';

import { UnitOfWork } from './postgres/core';
import { PgClient, PgProduct } from './postgres/entities';
import { LoggerModule } from '../gateways/logger/logger.module';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([PgClient, PgProduct]), LoggerModule],
  providers: [{ provide: 'IUnitOfWorkTypeORM', useClass: UnitOfWork }],
  exports: ['IUnitOfWorkTypeORM'],
})
export class PostgresModule {}

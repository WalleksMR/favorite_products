import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';

import { PostgresModule } from '@/infrastructure/database/postgres.module';

import { controllers } from './controller';
import { EnvHealthIndicator } from '../helpers/controllers';

@Module({
  imports: [TerminusModule, CqrsModule, PostgresModule],
  controllers,
  providers: [EnvHealthIndicator],
})
export class ControllerModule {}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';

import { PostgresModule } from '@/infrastructure/database/postgres.module';

import { controllers } from './controller';
import { JwtAuthGuard } from '../common/guards';
import { JwtStrategy } from '../common/strategies';
import { JwtConfigModule } from '../config/jwt';
import { EnvHealthIndicator } from '../helpers/controllers';

@Module({
  imports: [TerminusModule, CqrsModule, PostgresModule, JwtConfigModule],
  controllers,
  providers: [EnvHealthIndicator, { provide: APP_GUARD, useClass: JwtAuthGuard }, JwtStrategy],
})
export class ControllerModule {}

import { Module } from '@nestjs/common';

import { CqrsConfigModule } from '@/application/cqrs/cqrs.module';
import { LoggerModule } from '@/infrastructure/gateways/logger/logger.module';
import { EnvironmentConfigModule } from '@/main/config/environment';

import { AllExceptionFilter } from './common/filters';
import { ControllerModule } from './controllers/controller.module';

@Module({
  imports: [LoggerModule, EnvironmentConfigModule, ControllerModule, CqrsConfigModule],
  providers: [AllExceptionFilter],
})
export class AppModule {}

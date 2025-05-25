import { Module } from '@nestjs/common';

import { ILogger } from '@/domain/contracts/gateways';

import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService, { provide: ILogger.Name, useClass: LoggerService }],
  exports: [ILogger.Name],
})
export class LoggerModule {}

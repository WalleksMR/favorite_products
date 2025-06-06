import { Injectable, Logger } from '@nestjs/common';

import { ILogger as LoggerInterface } from '@/domain/contracts/gateways';
import { env } from '@/main/config/environment';

@Injectable()
export class LoggerService extends Logger implements LoggerInterface {
  debug(context: string, message: string) {
    if (!env.IsProduction()) {
      super.debug(`[DEBUG] ${message}`, context);
    }
  }
  log(context: string, message: string) {
    super.log(`[INFO] ${message}`, context);
  }
  error(context: string, message: string, trace?: string) {
    super.error(`[ERROR] ${message}`, trace, context);
  }
  warn(context: string, message: string) {
    super.warn(`[WARN] ${message}`, context);
  }
  verbose(context: string, message: string) {
    if (!env.IsProduction()) {
      super.verbose(`[VERBOSE] ${message}`, context);
    }
  }
}

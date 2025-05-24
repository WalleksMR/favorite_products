/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILogger } from '@/domain/contracts/gateways';
export class LoggerInMemory implements ILogger {
  debug(context: string, message: string): void {
    return;
  }
  log(context: string, message: string): void {
    return;
  }
  error(context: string, message: string, trace?: string): void {
    return;
  }
  warn(context: string, message: string): void {
    return;
  }
  verbose(context: string, message: string): void {
    return;
  }
}

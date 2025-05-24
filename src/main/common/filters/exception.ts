import * as fs from 'fs';

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Request } from 'express';
import { QueryFailedError } from 'typeorm';

import { LoggerService } from '@/infrastructure/gateways/logger/logger.service';

interface IError {
  message: string;
  code_error: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(LoggerService)
    private readonly logger: LoggerService,
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    const method = request.method;
    const route = request.route?.path || request.url;

    const { status, message } = this.Exception(exception);
    const responseTimeInSeconds = (Date.now() - request['startTime']) / 1000;

    const responseData = {
      ...{
        statusCode: status,
      },
      ...message,
    };

    this.logMessage(request, message, status, exception);
    response.status(status).json(responseData);
  }

  private logMessage(request: any, message: IError, status: number, exception: any) {
    if ((status === 400 || status === 500) && request.file) {
      try {
        fs.unlinkSync(request.file.path);
      } catch {
        return;
      }
    }
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${message.code_error ? message.code_error : null} message=${
          message.message ? message.message : null
        }`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${message.code_error ? message.code_error : null} message=${
          message.message ? message.message : null
        }`,
      );
    }
  }

  private Exception(err: Error) {
    let status: number;
    let message: IError;
    if (err instanceof HttpException) {
      status = err.getStatus();
      message = err.getResponse() as IError;
    } else if (err instanceof QueryFailedError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: err.message, code_error: null };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: err.message, code_error: null };
    }

    return { status, message };
  }


}

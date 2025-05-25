import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { QueryFailedError } from 'typeorm';

import { AppError, InvalidParameterError, UnauthorizedError } from '@/application/errors';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof UnauthorizedError) {
          throw new UnauthorizedException(err.message);
        } else if (err instanceof InvalidParameterError) {
          throw new BadRequestException(err.message);
        } else if (err instanceof QueryFailedError) {
          throw new InternalServerErrorException(err.message);
        } else if (err instanceof AppError) {
          throw new BadRequestException(err.message);
        } else {
          throw err;
        }
      }),
    );
  }
}

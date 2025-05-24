import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const headers = context.switchToHttp().getRequest().headers;
    if (headers?.rest_mode === 'list') {
      context.switchToHttp().getResponse().statusCode = 200;
      return next.handle().pipe();
    }
    return next.handle().pipe();
  }
}

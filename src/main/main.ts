import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { LoggerService } from '@/infrastructure/gateways/logger/logger.service';

import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters';
import { LoggerInterceptor, PaginationInterceptor, ValidationInterceptor } from './common/interceptors';
import { env } from './config/environment';
import { setupSwagger } from './config/swagger/setup';

async function bootstrap() {
  const prefix = `${env.app.uri_prefix}`;
  const port = env.app.port;
  const defaultVersion = env.app.api_versions.map((v) => String(v));

  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new LoggerService();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new PaginationInterceptor());
  app.useGlobalInterceptors(new ValidationInterceptor());
  app.useGlobalInterceptors(new LoggerInterceptor(logger));
  app.useGlobalFilters(app.get(AllExceptionFilter));
  app.setGlobalPrefix(prefix);
  app.enableVersioning({ type: VersioningType.URI, defaultVersion });
  setupSwagger(prefix, app);

  await app.listen(port).then(() => {
    logger.log('Bootstrap', `Server started on port "${port}"`);
  });
}
bootstrap();

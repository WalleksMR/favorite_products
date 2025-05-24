import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { version, description, name } from '../../../../package.json';

export const setupSwagger = (prefix: string, app: INestApplication) => {
  const title = name.charAt(0).toUpperCase() + name.slice(1).replace(/\_/gm, ' ');
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addApiKey({
      name: 'x-api-token',
      type: 'apiKey',
      description: 'Chave de autenticação',
    })
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/v1/docs`, app, document);
};

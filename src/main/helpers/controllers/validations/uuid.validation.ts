import { ParseUUIDPipe, ParseUUIDPipeOptions } from '@nestjs/common';

import { InvalidParameterError } from '@/application/errors';

export class ValidUUIDPipe extends ParseUUIDPipe {
  constructor(options?: ParseUUIDPipeOptions) {
    super({
      ...options,
      exceptionFactory: () => {
        throw new InvalidParameterError('ID inválido');
      },
    });
  }
}

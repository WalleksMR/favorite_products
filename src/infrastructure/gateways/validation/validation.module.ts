import { Module } from '@nestjs/common';

import { ValidationClassValidator } from './validation.setup';

@Module({
  providers: [{ provide: 'IValidation', useClass: ValidationClassValidator }],
  exports: [{ provide: 'IValidation', useClass: ValidationClassValidator }],
})
export class ValidationConfigModule {}

import { isEmpty, isUUID } from 'class-validator';

import { IValidation } from '@/domain/contracts/gateways/validation';

export class ValidationClassValidator implements IValidation {
  IsUUID(input: string): boolean {
    return isUUID(input);
  }
  IsEmpty(input: string): boolean {
    return isEmpty(input);
  }
}

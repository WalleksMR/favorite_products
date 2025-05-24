import { v7 } from 'uuid';

import { IUUID } from '@/domain/contracts/gateways';
export class UUID implements IUUID {
  generate() {
    return v7();
  }
}

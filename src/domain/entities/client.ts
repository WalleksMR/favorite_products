import { UUID } from '@/application/contracts/gateways';

import { PartialPick } from '../core/partial-types';

export class Client {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(prop: ClientProps) {
    this.id = prop.id || new UUID().generate();
    this.email = prop.email;
    this.createdAt = prop.createdAt || new Date();
    this.updatedAt = prop.updatedAt || new Date();
  }
}

type ClientProps = PartialPick<Client, 'id' | 'createdAt' | 'updatedAt'>;

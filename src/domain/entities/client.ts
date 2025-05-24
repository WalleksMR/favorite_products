import { UUID } from '@/application/contracts/gateways';

import { PartialPick } from '../core/partial-types';

export class Client {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;

  constructor(prop: ClientProps) {
    this.id = prop.id || new UUID().generate();
    this.email = prop.email;
    this.created_at = prop.created_at || new Date();
    this.updated_at = prop.updated_at || new Date();
  }
}

type ClientProps = PartialPick<Client, 'id' | 'created_at' | 'updated_at'>;

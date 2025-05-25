import { IsUUID } from 'class-validator';

export class ClientsDeleteCommand {
  @IsUUID()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

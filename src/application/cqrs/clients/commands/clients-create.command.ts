import { IsEmail, IsString } from 'class-validator';

export class ClientsCreateCommand {
  @IsString()
  name: string;
  @IsEmail()
  email: string;

  constructor(props: ClientsCreateCommand) {
    this.name = props?.name;
    this.email = props?.email;
  }
}

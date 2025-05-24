import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ClientsCreateBodyDto {
  @ApiProperty({ description: 'Client name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Client email', example: 'johndoe@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

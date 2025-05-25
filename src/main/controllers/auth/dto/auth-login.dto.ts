import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthLoginBodyDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

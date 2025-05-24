import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ClientsUpdateBodyDto {
  @ApiProperty({ description: 'Client name', example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Client email', example: 'johndoe@email.com' })
  @IsEmail()
  @IsOptional()
  email?: string;
}

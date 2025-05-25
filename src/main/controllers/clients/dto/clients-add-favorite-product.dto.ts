import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class ClientsAddFavoriteProductBodyDto {
  @ApiProperty({ required: false, isArray: true, example: ['123e4567-e89b-12d3-a456-426614174000'] })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  id_products?: string[] = [];

  @ApiProperty({ required: false, isArray: true, example: ['22'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ids_external?: string[] = [];
}

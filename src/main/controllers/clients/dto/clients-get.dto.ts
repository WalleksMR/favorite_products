import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsOptional } from 'class-validator';

import { PaginationQueryOptions } from '@/main/helpers/controllers';

export class ClientsGetQueryDto extends PaginationQueryOptions {
  @ApiProperty({ required: false, description: 'Com os produtos favoritos', example: 'true' })
  @IsOptional()
  @IsBooleanString()
  withFavoriteProducts?: boolean;
}

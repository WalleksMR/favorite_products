import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PaginationOptions } from '@/application/contracts/gateways';
import { Pagination } from '@/domain/contracts/gateways';

export class PaginationQueryOptions {
  @ApiProperty({ required: false, description: "Modo da listagem: 'paginate' ou 'list'", example: 'paginate' })
  @IsOptional()
  @IsString()
  restMode: string;
  @ApiProperty({ required: false, description: 'Paginação', example: 1 })
  @IsOptional()
  @IsString()
  restPage: string;
  @ApiProperty({ required: false, description: 'Quantidade de itens que serão retornados por página', example: 25 })
  @IsOptional()
  @IsString()
  restLimit: string;
}

export function paginationOptions(input: PaginationQueryOptions): PaginationOptions {
  const restPage = input['restPage'] ? Number(input['restPage']) : 1;
  let restLimit = input['restLimit'] ? Number(input['restLimit']) : 10;

  if (restLimit > 100) {
    restLimit = 100;
  }

  const restMode: Pagination.restMode = input['restMode'] ? Pagination.restMode[input['restMode']] : 'paginate';
  const options = {
    restPage,
    restLimit,
    restMode,
  };

  return options;
}

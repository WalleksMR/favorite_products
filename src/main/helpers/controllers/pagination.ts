import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { Pagination } from '@/domain/contracts/gateways';
type Input = {
  'rest-mode': string;
  'rest-page': string;
  'rest-limit': string;
};
export function paginationOptions(input: Input) {
  const RestPage = input['rest-page'] ? Number(input['rest-page']) : 1;
  let RestLimit = input['rest-limit'] ? Number(input['rest-limit']) : 10;

  if (RestLimit > 100) {
    RestLimit = 100;
  }

  const RestMode: Pagination.RestMode = input['rest-mode'] ? Pagination.RestMode[input['rest-mode']] : 'paginate';
  const options = {
    RestPage,
    RestLimit,
    RestMode,
  };
  return options;
}

export class PaginationHeaderOptions {
  @ApiProperty({ required: false, description: "Modo da listagem: 'paginate' ou 'list'", example: 'list' })
  @IsOptional()
  @IsString()
  'rest-mode': string;
  @ApiProperty({ required: false, description: 'Paginação', example: 1 })
  @IsOptional()
  @IsString()
  'rest-page': string;
  @ApiProperty({ required: false, description: 'Quantidade de itens que serão retornados por página', example: 25 })
  @IsOptional()
  @IsString()
  'rest-limit': string;
}

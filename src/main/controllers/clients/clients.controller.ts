import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationOptions } from '@/application/contracts/gateways';
import {
  ClientsRemoveFavoriteProductCommand,
  ClientsAddFavoriteProductCommand,
  ClientsCreateCommand,
  ClientsDeleteCommand,
  ClientsUpdateCommand,
} from '@/application/cqrs/clients/commands';
import {
  ClientsGetAllQuery,
  ClientsGetByIdQuery,
  ClientsGetFavoriteProductsQuery,
} from '@/application/cqrs/clients/queries';
import { ErrorExemple } from '@/main/docs';
import {
  ClientsGetByIdOutputExemple,
  ClientsGetFavoriteProductsOutputExemple,
  ClientsGetFavoriteProductsPaginationOutputExemple,
  ClientsGetOutputListOutputExemple,
  ClientsGetOutputPaginationOutputExemple,
} from '@/main/docs/controllers/clients';
import { paginationOptions } from '@/main/helpers/controllers';

import {
  ClientsCreateBodyDto,
  ClientsGetQueryDto,
  ClientsUpdateBodyDto,
  ClientsGetFavoriteProductQueryDto,
  ClientsAddFavoriteProductBodyDto,
  ClientsRemoveFavoriteProductBodyDto,
} from './dto';

@ApiBadRequestResponse({ description: 'Bad Request', example: ErrorExemple })
@ApiBearerAuth()
@ApiTags(ClientsController.ROUTE)
@Controller(ClientsController.ROUTE)
export class ClientsController {
  static ROUTE = 'clients';
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @ApiOperation({ summary: 'Obter todos os clientes' })
  @ApiResponse({ description: 'restMode: list', example: ClientsGetOutputListOutputExemple, status: HttpStatus.OK })
  @ApiResponse({
    description: 'restMode: paginate',
    example: ClientsGetOutputPaginationOutputExemple,
    status: HttpStatus.PARTIAL_CONTENT,
  })
  @Get()
  async get(@Query() query: ClientsGetQueryDto) {
    const pagination = paginationOptions(query);
    return this.queryBus.execute(new ClientsGetAllQuery(new PaginationOptions(pagination)));
  }

  @ApiOperation({ summary: 'Cadastrar um novo cliente' })
  @ApiResponse({ description: 'Created', status: HttpStatus.CREATED })
  @Post()
  async create(@Body() body: ClientsCreateBodyDto) {
    await this.commandBus.execute(new ClientsCreateCommand(body));
  }

  @ApiOperation({ summary: 'Obter detalhamento de um cliente' })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: String })
  @ApiResponse({ example: ClientsGetByIdOutputExemple, status: HttpStatus.OK })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.queryBus.execute(new ClientsGetByIdQuery({ id }));
  }

  @ApiOperation({ summary: 'Atualizar os dados de um cliente' })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: String })
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: ClientsUpdateBodyDto) {
    await this.commandBus.execute(new ClientsUpdateCommand({ ...body, id }));
  }

  @ApiOperation({ summary: 'Deletar um cliente' })
  @ApiResponse({ description: 'No Content', status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute(new ClientsDeleteCommand(id));
  }

  @ApiOperation({
    summary: 'Adicionar produtos favoritos',
    description:
      'Enviar apenas `id_products` ou `ids_external`. Para os produtos que vem da API external, enviar no campo `ids_external` ',
  })
  @ApiResponse({ description: 'No Content', status: HttpStatus.NO_CONTENT })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: String })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/favorite-products/add')
  async addFavoriteProducts(@Param('id') id: string, @Body() body: ClientsAddFavoriteProductBodyDto) {
    await this.commandBus.execute(new ClientsAddFavoriteProductCommand(id, body.id_products, body.ids_external));
  }

  @ApiOperation({
    summary: 'Remover produtos favoritos',
    description:
      'Enviar apenas `id_products` ou `ids_external`. Para os produtos que vem da API external, enviar no campo `ids_external` ',
  })
  @ApiResponse({ description: 'No Content', status: HttpStatus.NO_CONTENT })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: String })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/favorite-products/remove')
  async removeFavoriteProducts(@Param('id') id: string, @Body() body: ClientsRemoveFavoriteProductBodyDto) {
    await this.commandBus.execute(new ClientsRemoveFavoriteProductCommand(id, body.id_products, body.ids_external));
  }

  @ApiOperation({ summary: 'Listar produtos favoritos' })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: String })
  @ApiResponse({
    description: 'restMode: list',
    example: ClientsGetFavoriteProductsOutputExemple,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'restMode: paginate',
    example: ClientsGetFavoriteProductsPaginationOutputExemple,
    status: HttpStatus.PARTIAL_CONTENT,
  })
  @Get(':id/favorite-products')
  async getFavoriteProducts(@Param('id') id: string, @Query() query: ClientsGetFavoriteProductQueryDto) {
    const pagination = paginationOptions(query);
    return this.queryBus.execute(new ClientsGetFavoriteProductsQuery(id, pagination));
  }
}

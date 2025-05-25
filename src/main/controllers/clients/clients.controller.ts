import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { PaginationOptions } from '@/application/contracts/gateways';
import { ClientsGetAllQuery } from '@/application/cqrs/clients/queries';
import { paginationOptions } from '@/main/helpers/controllers';

import { ClientsCreateBodyDto, ClientsGetQueryDto, ClientsUpdateBodyDto } from './dto';

@ApiTags(ClientsController.ROUTE)
@Controller(ClientsController.ROUTE)
export class ClientsController {
  static ROUTE = 'clients';
  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Obter todos os clientes' })
  @Get()
  async get(@Query() query: ClientsGetQueryDto) {
    const pagination = paginationOptions(query);
    return this.queryBus.execute(new ClientsGetAllQuery(new PaginationOptions(pagination), query.withFavoriteProducts));
  }

  @ApiOperation({ summary: 'Cadastrar um novo cliente' })
  @Post()
  async create(@Body() body: ClientsCreateBodyDto) {
    return body;
  }

  @ApiOperation({ summary: 'Obter detalhamento de um cliente' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    return `Hello World ${id}`;
  }

  @ApiOperation({ summary: 'Atualizar os dados de um cliente' })
  @ApiParam({ name: 'id', description: 'Client ID', type: String })
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: ClientsUpdateBodyDto) {
    return `Hello World ${body}`;
  }

  @ApiOperation({ summary: 'Deletar um cliente' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return `Hello World ${id}`;
  }
}

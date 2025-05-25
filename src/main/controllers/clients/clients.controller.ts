import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBadRequestResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationOptions } from '@/application/contracts/gateways';
import { ClientsCreateCommand, ClientsDeleteCommand } from '@/application/cqrs/clients/commands';
import { ClientsGetAllQuery } from '@/application/cqrs/clients/queries';
import { ErrorExemple } from '@/main/docs';
import { ClientsGetOutputListExemple, ClientsGetOutputPaginationExemple } from '@/main/docs/controllers/clients';
import { paginationOptions } from '@/main/helpers/controllers';

import { ClientsCreateBodyDto, ClientsGetQueryDto, ClientsUpdateBodyDto } from './dto';

@ApiBadRequestResponse({ description: 'Bad Request', example: ErrorExemple })
@ApiTags(ClientsController.ROUTE)
@Controller(ClientsController.ROUTE)
export class ClientsController {
  static ROUTE = 'clients';
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @ApiOperation({ summary: 'Obter todos os clientes' })
  @ApiResponse({ description: 'restMode: list', example: ClientsGetOutputListExemple, status: HttpStatus.OK })
  @ApiResponse({
    description: 'restMode: paginate',
    example: ClientsGetOutputPaginationExemple,
    status: HttpStatus.PARTIAL_CONTENT,
  })
  @Get()
  async get(@Query() query: ClientsGetQueryDto) {
    const pagination = paginationOptions(query);
    return this.queryBus.execute(new ClientsGetAllQuery(new PaginationOptions(pagination), query.withFavoriteProducts));
  }

  @ApiOperation({ summary: 'Cadastrar um novo cliente' })
  @ApiResponse({ description: 'Created', status: HttpStatus.CREATED })
  @Post()
  async create(@Body() body: ClientsCreateBodyDto) {
    await this.commandBus.execute(new ClientsCreateCommand(body));
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
    await this.commandBus.execute(new ClientsDeleteCommand(id));
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationOptions } from '@/application/contracts/gateways';
import {
  ClientsAddFavoriteProductCommand,
  ClientsCreateCommand,
  ClientsDeleteCommand,
  ClientsUpdateCommand,
} from '@/application/cqrs/clients/commands';
import { ClientsGetAllQuery, ClientsGetByIdQuery } from '@/application/cqrs/clients/queries';
import { ErrorExemple } from '@/main/docs';
import {
  ClientsGetByIdOutputExemple,
  ClientsGetOutputListExemple,
  ClientsGetOutputPaginationExemple,
} from '@/main/docs/controllers/clients';
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
  @ApiParam({ name: 'id', description: 'Id do cliente', type: String })
  @ApiQuery({ name: 'withFavoriteProducts', description: 'Incluir produtos favoritos', type: Boolean, required: false })
  @ApiResponse({ example: ClientsGetByIdOutputExemple, status: HttpStatus.OK })
  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Query('withFavoriteProducts', new ParseBoolPipe({ optional: true })) withFavoriteProducts = false,
  ) {
    return this.queryBus.execute(new ClientsGetByIdQuery({ id, withFavoriteProducts }));
  }

  @ApiOperation({ summary: 'Atualizar os dados de um cliente' })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: String })
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: ClientsUpdateBodyDto) {
    await this.commandBus.execute(new ClientsUpdateCommand({ ...body, id }));
  }

  @ApiOperation({ summary: 'Deletar um cliente' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute(new ClientsDeleteCommand(id));
  }

  @ApiOperation({ summary: 'Adicionar produtos favoritos' })
  @ApiResponse({ description: 'No Content', status: HttpStatus.NO_CONTENT })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: String })
  @ApiBody({ description: 'Lista de produtos favoritos', type: String, isArray: true })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/favorite-products/add')
  async addFavoriteProducts(@Param('id') id: string, @Body() body: string[]) {
    await this.commandBus.execute(new ClientsAddFavoriteProductCommand(id, body));
  }
}

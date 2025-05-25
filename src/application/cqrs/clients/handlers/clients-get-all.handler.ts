import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { paginate } from 'nestjs-typeorm-paginate';

import { IUnitOfWorkTypeORM, Pagination } from '@/domain/contracts/gateways';
import { Client, Product } from '@/domain/entities';
import { PgClient } from '@/infrastructure/database/postgres/entities';

import { ClientsGetAllQuery } from '../queries/clients-get-all.query';

@QueryHandler(ClientsGetAllQuery)
export class ClientsGetAllQueryHandler implements IQueryHandler<ClientsGetAllQuery, Output> {
  constructor(
    @Inject('IUnitOfWorkTypeORM')
    private readonly uow: IUnitOfWorkTypeORM,
  ) {}

  async execute(input: ClientsGetAllQuery): Promise<Output> {
    const clientQueryBuilder = this.uow.getRepository(PgClient).createQueryBuilder('client');

    if (input.withFavoriteProducts) {
      clientQueryBuilder.leftJoinAndSelect('client.favoriteProducts', 'favoriteProducts');
    }

    if (input.pagination.restMode === 'list') {
      clientQueryBuilder.limit(input.pagination.restLimit);
      return await clientQueryBuilder.getMany();
    }

    return paginate(clientQueryBuilder, {
      limit: input.pagination.restLimit,
      page: input.pagination.restPage,
    });
  }
}

type OutputClient = Client & { favoriteProducts?: Product[] };
type Output = Array<OutputClient> | Pagination<OutputClient>;

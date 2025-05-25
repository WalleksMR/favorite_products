import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IUnitOfWorkTypeORM } from '@/domain/contracts/gateways';
import { Client, Product } from '@/domain/entities';
import { PgClient } from '@/infrastructure/database/postgres/entities';

import { ClientsGetByIdQuery } from '../queries';

@QueryHandler(ClientsGetByIdQuery)
export class ClientsGetByIdQueryHandler implements IQueryHandler<ClientsGetByIdQuery, Output> {
  constructor(
    @Inject('IUnitOfWorkTypeORM')
    private readonly uow: IUnitOfWorkTypeORM,
  ) {}

  async execute(input: ClientsGetByIdQuery): Promise<Output> {
    const clientQueryBuilder = this.uow.getRepository(PgClient).createQueryBuilder('client');

    if (input.withFavoriteProducts) {
      clientQueryBuilder.leftJoinAndSelect('client.favoriteProducts', 'favoriteProducts');
    }

    return clientQueryBuilder.where('client.id = :id', { id: input.id }).getOne();
  }
}

type Output = (Client & { favoriteProducts?: Product[] }) | null;

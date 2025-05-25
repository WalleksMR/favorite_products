import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { paginate } from 'nestjs-typeorm-paginate';

import { AppError } from '@/application/errors';
import { IUnitOfWorkTypeORM, Pagination } from '@/domain/contracts/gateways';
import { Product } from '@/domain/entities';
import { PgClient, PgProduct } from '@/infrastructure/database/postgres/entities';

import { ClientsGetFavoriteProductsQuery } from '../queries';

@QueryHandler(ClientsGetFavoriteProductsQuery)
export class ClientsGetFavoriteProductsQueryHandler implements IQueryHandler<ClientsGetFavoriteProductsQuery, Output> {
  constructor(
    @Inject('IUnitOfWorkTypeORM')
    private readonly uow: IUnitOfWorkTypeORM,
  ) {}

  async execute(input: ClientsGetFavoriteProductsQuery): Promise<Output> {
    const client = this.uow
      .getRepository(PgClient)
      .createQueryBuilder('client')
      .select(['client.id'])
      .where('client.id = :id', { id: input.id_client })
      .getOne();

    if (!client) {
      throw new AppError('Cliente inválido');
    }

    const producsQueryBuider = this.uow
      .getRepository(PgProduct)
      .createQueryBuilder('product')
      .select(['product.id', 'product.title', 'product.price', 'product.image', 'product.review'])
      .innerJoin('product.clients', 'client')
      .where('client.id = :id', { id: input.id_client });

    if (input.pagination.restMode === 'list') {
      producsQueryBuider.take(input.pagination.restLimit);
      return producsQueryBuider.getMany();
    }

    return paginate(producsQueryBuider, {
      limit: input.pagination.restLimit,
      page: input.pagination.restPage,
    });
  }
}

type OutputProduct = Pick<Product, 'id' | 'title' | 'price' | 'image' | 'review'>;
type Output = Array<OutputProduct> | Pagination<OutputProduct>;

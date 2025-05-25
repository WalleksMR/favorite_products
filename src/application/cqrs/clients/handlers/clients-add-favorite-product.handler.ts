import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { In } from 'typeorm';

import { IFakeStoreAPI } from '@/application/contracts/gateways';
import { AppError } from '@/application/errors';
import { IUnitOfWorkTypeORM } from '@/domain/contracts/gateways';
import { PgClient, PgProduct } from '@/infrastructure/database/postgres/entities';
import { TableName } from '@/infrastructure/database/utils';
import { env } from '@/main/config/environment';

import { ClientsAddFavoriteProductCommand } from '../commands';

@CommandHandler(ClientsAddFavoriteProductCommand)
export class ClientsAddFavoriteProductCommandHandler implements ICommandHandler<ClientsAddFavoriteProductCommand> {
  constructor(
    @Inject('IUnitOfWorkTypeORM')
    private readonly uow: IUnitOfWorkTypeORM,
    @Inject('IFakeStoreAPI')
    private readonly fakeStoreAPI: IFakeStoreAPI,
  ) {}

  async execute(input: ClientsAddFavoriteProductCommand): Promise<void> {
    const clientRepo = this.uow.getRepository(PgClient);
    const productRepo = this.uow.getRepository(PgProduct);

    const productLength = input.id_products.length;
    if (productLength > 10) {
      throw new AppError('Deve haver no máximo 10 produtos');
    }

    const client = await clientRepo
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.favoriteProducts', 'favoriteProducts', 'favoriteProducts.id IN (:...productsId)', {
        productsId: input.id_products,
      })
      .where('client.id = :id_client', { id_client: input.id_client })
      .select(['client.id', 'favoriteProducts.id'])
      .getOne();

    if (!client) {
      throw new AppError('Cliente inválido');
    }

    const productsUnique = input.id_products.filter(
      (id) => client.favoriteProducts.length === 0 || client.favoriteProducts.some((product) => product.id !== id),
    );

    if (productsUnique.length === 0) {
      throw new AppError('Todos os produtos já estão cadastrados como favoritos');
    }

    const products = await productRepo.find({
      select: { id: true },
      where: { id: In(productsUnique) },
    });

    if (products.length !== productsUnique.length) {
      throw new AppError('Um ou mais produtos inválidos');
    }

    for (const product of products) {
      const existProduct = await this.fakeStoreAPI.getProductById(product.id_external);
      if (!existProduct) {
        throw new AppError(`Produto com ID "${product.id}" não encontrado na Fake Store API`);
      }
    }

    const productPreparer = productsUnique.map((productId) => `('${client.id}', '${productId}')`).join(', ');
    const query = `INSERT INTO ${env.database.schema}.${TableName.FavoriteProducts} (id_client, id_product) VALUES ${productPreparer}`;
    await this.uow.query(query, []);
  }
}

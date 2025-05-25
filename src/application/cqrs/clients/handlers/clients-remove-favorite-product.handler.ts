import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError } from '@/application/errors';
import { IUnitOfWorkTypeORM } from '@/domain/contracts/gateways';
import { PgClient, PgProduct } from '@/infrastructure/database/postgres/entities';
import { TableName } from '@/infrastructure/database/utils';
import { env } from '@/main/config/environment';

import { ClientsRemoveFavoriteProductCommand } from '../commands';

@CommandHandler(ClientsRemoveFavoriteProductCommand)
export class ClientsRemoveFavoriteProductCommandHandler
  implements ICommandHandler<ClientsRemoveFavoriteProductCommand, void>
{
  constructor(
    @Inject('IUnitOfWorkTypeORM')
    private readonly uow: IUnitOfWorkTypeORM,
  ) {}

  async execute(input: ClientsRemoveFavoriteProductCommand): Promise<void> {
    const clientRepo = this.uow.getRepository(PgClient);
    const productRepo = this.uow.getRepository(PgProduct);

    const productLength = input.id_products.length || input.ids_external.length;
    if (productLength > env.app.maxFavoriteProducts) {
      throw new AppError(`Deve haver no máximo "${env.app.maxFavoriteProducts}" produtos`);
    }

    const client = await clientRepo
      .createQueryBuilder('client')
      .where('client.id = :id_client', { id_client: input.id_client })
      .select(['client.id'])
      .getOne();

    if (!client) {
      throw new AppError('Cliente inválido');
    }

    const favoriteProductsBuilder = productRepo
      .createQueryBuilder('product')
      .innerJoin('product.clients', 'clients')
      .where('clients.id = :id_client', { id_client: input.id_client })
      .select(['product.id', 'product.id_external']);

    if (input.id_products.length) {
      favoriteProductsBuilder.andWhere('product.id IN (:...id_products)', { id_products: input.id_products });
    }

    if (input.ids_external.length) {
      favoriteProductsBuilder.andWhere('product.id_external IN (:...ids_external)', {
        ids_external: input.ids_external,
      });
    }

    const favoriteProducts = await favoriteProductsBuilder.getMany();

    if (favoriteProducts.length === 0) {
      throw new AppError('Nenhum produto favorito encontrado');
    }

    if (
      (input.id_products.length && favoriteProducts.length !== input.id_products.length) ||
      (input.ids_external.length && favoriteProducts.length !== input.ids_external.length)
    ) {
      throw new AppError('Todos os produtos devem estar como favoritos');
    }

    const productIds = favoriteProducts.map((product) => `'${product.id}'`).join(',');
    const query = `DELETE FROM ${env.database.schema}.${TableName.FavoriteProducts} WHERE id_client = $1 AND id_product IN (${productIds})`;
    await this.uow.query(query, [input.id_client]);
  }
}

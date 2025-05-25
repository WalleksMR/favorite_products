import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError } from '@/application/errors';
import { IUnitOfWorkTypeORM } from '@/domain/contracts/gateways';
import { PgClient } from '@/infrastructure/database/postgres/entities';
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

    if (input.id_products.length > 10) {
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

    if (client.favoriteProducts.length === 0) {
      throw new AppError('Nenhum produto favorito encontrado');
    }

    if (client.favoriteProducts.length !== input.id_products.length) {
      throw new AppError('Todos os produtos devem ser favoritos');
    }

    const productIds = input.id_products.map((id) => `'${id}'`).join(',');
    const query = `DELETE FROM ${env.database.schema}.${TableName.FavoriteProducts} WHERE id_client = $1 AND id_product IN (${productIds})`;
    await this.uow.query(query, [input.id_client]);
  }
}

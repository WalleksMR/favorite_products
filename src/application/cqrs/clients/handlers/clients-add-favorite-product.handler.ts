import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { In } from 'typeorm';

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
  ) {}

  async execute(input: ClientsAddFavoriteProductCommand): Promise<void> {
    const clientRepo = this.uow.getRepository(PgClient);
    const productRepo = this.uow.getRepository(PgProduct);

    const productLength = input.id_products.length;
    if (productLength > 10) {
      throw new AppError('Deve haver no máximo 10 produtos');
    }

    const client = await clientRepo.findOne({
      select: { id: true },
      where: { id: input.id_client },
    });

    if (!client) {
      throw new AppError('Cliente inválido');
    }

    const products = await productRepo.find({
      select: { id: true },
      where: { id: In(input.id_products) },
    });

    if (products.length !== productLength) {
      throw new AppError('Um ou mais produtos inválidos');
    }

    const productPreparer = products.map((product) => `('${client.id}', '${product.id}')`).join(', ');
    const query = `INSERT INTO ${env.database.schema}.${TableName.FavoriteProducts} (id_client, id_product) VALUES ${productPreparer}`;
    await this.uow.query(query, []);
  }
}

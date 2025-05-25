import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { In } from 'typeorm';

import { IFakeStoreAPI } from '@/application/contracts/gateways';
import { AppError } from '@/application/errors';
import { IUnitOfWorkTypeORM } from '@/domain/contracts/gateways';
import { Product } from '@/domain/entities';
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

    client.favoriteProducts = await favoriteProductsBuilder.getMany();

    if (input.id_products.length) {
      await this.addByProductId(input, client);
    } else if (input.ids_external.length) {
      await this.addByExternalId(input, client);
    } else {
      throw new AppError('Deve ser enviado pelo menos um dos campos: id_products ou ids_external');
    }
  }

  private async addByProductId(input: ClientsAddFavoriteProductCommand, client: PgClient) {
    const productRepo = this.uow.getRepository(PgProduct);

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

  private async addByExternalId(input: ClientsAddFavoriteProductCommand, client: PgClient) {
    const productRepo = this.uow.getRepository(PgProduct);
    const productsUnique = input.ids_external.filter(
      (id) =>
        client.favoriteProducts.length === 0 || client.favoriteProducts.some((product) => product.id_external !== id),
    );

    if (productsUnique.length === 0) {
      throw new AppError('Todos os produtos já estão cadastrados como favoritos');
    }
    const products = await productRepo.find({
      select: { id: true, id_external: true },
      where: { id_external: In(productsUnique) },
    });

    const productsExternal: Array<Product> = [];

    for (const productId of productsUnique) {
      if (products.some((product) => product.id_external === productId)) {
        continue;
      }
      const existProduct = await this.fakeStoreAPI.getProductById(productId);
      if (!existProduct) {
        throw new AppError(`Produto com ID "${productId}" não encontrado na Fake Store API`);
      }

      productsExternal.push(
        new Product({
          id_external: String(existProduct.id),
          image: existProduct.image,
          title: existProduct.title,
          price: existProduct.price,
          review: null,
        }),
      );
    }

    await productRepo.save(productsExternal);

    const productPreparer = [...products.map((p) => p.id), ...productsExternal.map((p) => p.id)]
      .map((productId) => `('${client.id}', '${productId}')`)
      .join(', ');

    const query = `INSERT INTO ${env.database.schema}.${TableName.FavoriteProducts} (id_client, id_product) VALUES ${productPreparer}`;
    await this.uow.query(query, []);
  }
}

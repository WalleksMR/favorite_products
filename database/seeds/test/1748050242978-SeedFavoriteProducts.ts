import { faker } from '@faker-js/faker';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { Client, Product } from '@/domain/entities';
import { PgClient } from '@/infrastructure/database/postgres/entities';
export class SeedFavoriteProducts1748050242978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const clientRepo = queryRunner.manager.getRepository(PgClient);

    const clients = [
      {
        ...new Client({
          email: 'johndoe@email.com',
        }),
        favoriteProducts: [],
      },
      {
        ...new Client({
          email: faker.internet.email(),
        }),
        favoriteProducts: [],
      },
      {
        ...new Client({
          email: faker.internet.email(),
        }),
        favoriteProducts: [],
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const client of clients) {
      for (let i = 0; i < 5; i++) {
        client.favoriteProducts.push(
          new Product({
            title: faker.commerce.productName(),
            image: faker.image.imageUrl(),
            price: Number(faker.commerce.price()),
            review: faker.datatype.number({ min: 1, max: 5 }),
          }),
        );
      }
    }

    await clientRepo.save(clients);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('TRUNCATE TABLE favorite_products CASCADE');
    queryRunner.query('TRUNCATE TABLE products CASCADE');
  }
}

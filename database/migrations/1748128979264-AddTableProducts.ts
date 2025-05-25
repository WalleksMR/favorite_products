import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { TableName } from '@/infrastructure/database/utils';

export class AddTableProducts1748128979264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.Products,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'title', type: 'varchar(128)' },
          { name: 'image', type: 'varchar' },
          { name: 'price', type: 'int' },
          { name: 'review', type: 'int', isNullable: true },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
          { name: 'updatedAt', type: 'timestamptz', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: TableName.FavoriteProducts,
        columns: [
          { name: 'id_client', type: 'uuid' },
          { name: 'id_product', type: 'uuid' },
        ],
        foreignKeys: [
          {
            name: 'FK_client',
            columnNames: ['id_client'],
            referencedTableName: TableName.Clients,
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_product',
            columnNames: ['id_product'],
            referencedTableName: TableName.Products,
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'IDX_client product_unique',
            columnNames: ['id_client', 'id_product'],
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.Products);
  }
}

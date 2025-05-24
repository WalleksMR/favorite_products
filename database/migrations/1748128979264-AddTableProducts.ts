import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { TableName } from '@/infrastructure/database/utils';

export class AddTableProducts1748128979264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.Product,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.Product);
  }
}

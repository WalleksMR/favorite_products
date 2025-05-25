import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { TableName } from '@/infrastructure/database/utils';

export class AddTableClient1748050207585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.Clients,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar(128)' },
          { name: 'email', type: 'varchar(128)', isUnique: true },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
          { name: 'updatedAt', type: 'timestamptz', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.Clients);
  }
}

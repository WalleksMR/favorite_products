import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { TableName } from '../../utils';

@Entity(TableName.Client)
export class PgClient {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

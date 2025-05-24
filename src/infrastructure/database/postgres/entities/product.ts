import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { TableName } from '../../utils';

@Entity(TableName.Product)
export class PgProduct {
  @PrimaryColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  image: string;
  @Column()
  price: number;
  @Column()
  review: number | null;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

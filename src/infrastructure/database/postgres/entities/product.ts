import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { PgClient } from './client';
import { TableName } from '../../utils';

@Entity(TableName.Products)
export class PgProduct {
  @PrimaryColumn()
  id: string;
  @Column()
  id_external: string;
  @Column()
  title: string;
  @Column()
  image: string;
  @Column({ type: 'decimal' })
  price: number;
  @Column()
  review: number | null;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => PgClient, (client) => client.favoriteProducts)
  @JoinTable({
    name: TableName.FavoriteProducts,
    joinColumn: {
      name: 'id_product',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_client',
      referencedColumnName: 'id',
    },
  })
  clients?: PgClient[];
}

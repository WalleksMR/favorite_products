import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { PgProduct } from './product';
import { TableName } from '../../utils';

@Entity(TableName.Clients)
export class PgClient {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => PgProduct, (product) => product.clients, { cascade: true })
  @JoinTable({
    name: TableName.FavoriteProducts,
    joinColumn: {
      name: 'id_client',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_product',
      referencedColumnName: 'id',
    },
  })
  favoriteProducts: PgProduct[];
}

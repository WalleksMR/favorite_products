import { UUID } from '@/application/contracts/gateways';

import { PartialPick } from '../core/partial-types';

export class Product {
  id: string;
  id_external: string;
  title: string;
  image: string;
  price: number;
  review: number | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: ProductProps) {
    this.id = props?.id || new UUID().generate();
    this.id_external = props?.id_external || null;
    this.title = props.title;
    this.image = props.image;
    this.price = props.price;
    this.review = props.review;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }
}

type ProductProps = PartialPick<Product, 'id' | 'id_external' | 'createdAt' | 'updatedAt'>;

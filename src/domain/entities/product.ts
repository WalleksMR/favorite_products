import { UUID } from '@/application/contracts/gateways';

import { PartialPick } from '../core/partial-types';

export class Product {
  id: string;
  title: string;
  image: string;
  price: number;
  review: number | null;
  created_at: Date;
  updated_at: Date;

  constructor(props: ProductProps) {
    this.id = props?.id || new UUID().generate();
    this.title = props.title;
    this.image = props.image;
    this.price = props.price;
    this.review = props.review;
    this.created_at = props.created_at || new Date();
    this.updated_at = props.updated_at || new Date();
  }
}

type ProductProps = PartialPick<Product, 'id' | 'created_at' | 'updated_at'>;

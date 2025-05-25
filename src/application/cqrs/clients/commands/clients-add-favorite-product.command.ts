import { z } from 'zod';

import { AppError } from '@/application/errors';

const ClientsAddFavoriteProductCommandSchema = z.object({
  id_client: z.string().uuid('ID inválido'),
  id_products: z.array(z.string().uuid('ID inválido')).min(1, 'Deve haver pelo menos um produto'),
});

export class ClientsAddFavoriteProductCommand {
  id_client: string;
  id_products: string[];

  constructor(id_client: string, id_products: string[]) {
    const result = ClientsAddFavoriteProductCommandSchema.safeParse({
      id_client,
      id_products,
    });
    if (!result.success) {
      const message = result.error.errors[0]?.message;
      throw new AppError(message);
    }
    this.id_client = id_client;
    this.id_products = id_products;
  }
}

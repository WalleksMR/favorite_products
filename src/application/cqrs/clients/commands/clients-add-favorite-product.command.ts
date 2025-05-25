import { z } from 'zod';

import { AppError } from '@/application/errors';

const ClientsAddFavoriteProductCommandSchema = z.object({
  id_client: z.string().uuid('ID inválido'),
  id_products: z.array(z.string().uuid('ID inválido')).optional(),
  ids_external: z.array(z.string()).optional(),
});

export class ClientsAddFavoriteProductCommand {
  id_client: string;
  id_products: string[];
  ids_external: string[];

  constructor(id_client: string, id_products: string[], ids_external: string[]) {
    const result = ClientsAddFavoriteProductCommandSchema.safeParse({
      id_client,
      id_products,
      ids_external,
    });

    if (!result.success) {
      const message = result.error.errors[0]?.message;
      throw new AppError(message);
    }

    if (id_products.length > 0 && ids_external.length > 0) {
      throw new AppError('Deve ser enviado apenas um dos campos: id_products ou ids_external');
    }

    this.id_client = id_client;
    this.id_products = id_products;
    this.ids_external = ids_external;
  }
}

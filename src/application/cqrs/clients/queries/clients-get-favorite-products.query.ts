import { z } from 'zod';

import { PaginationOptions } from '@/application/contracts/gateways';
import { AppError } from '@/application/errors';
import { Pagination } from '@/domain/contracts/gateways';

const ClientsGetFavoriteProductsQuerySchema = z.object({
  id_client: z.string().uuid('ID inválido'),
});
export class ClientsGetFavoriteProductsQuery {
  id_client: string;
  pagination: Pagination.Options;

  constructor(id_client: string, pagination: PaginationOptions) {
    const result = ClientsGetFavoriteProductsQuerySchema.safeParse({
      id_client,
    });
    if (!result.success) {
      const message = result.error.errors[0]?.message;
      throw new AppError(message);
    }

    this.id_client = id_client;
    this.pagination = {
      restMode: pagination.restMode,
      restLimit: pagination.restLimit,
      restPage: pagination.restPage,
    };
  }
}

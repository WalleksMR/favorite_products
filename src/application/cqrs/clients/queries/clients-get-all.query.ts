import { PaginationOptions } from '@/application/contracts/gateways';
import { Pagination } from '@/domain/contracts/gateways';

export class ClientsGetAllQuery {
  pagination: Pagination.Options;
  withFavoriteProducts: boolean;

  constructor(pagination: PaginationOptions, withFavoriteProducts = false) {
    this.pagination = {
      restMode: pagination.restMode,
      restLimit: pagination.restLimit,
      restPage: pagination.restPage,
    };
    this.withFavoriteProducts = withFavoriteProducts;
  }
}

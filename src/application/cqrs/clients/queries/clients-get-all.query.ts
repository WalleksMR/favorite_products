import { PaginationOptions } from '@/application/contracts/gateways';
import { Pagination } from '@/domain/contracts/gateways';

export class ClientsGetAllQuery {
  pagination: Pagination.Options;

  constructor(pagination: PaginationOptions) {
    this.pagination = {
      restMode: pagination.restMode,
      restLimit: pagination.restLimit,
      restPage: pagination.restPage,
    };
  }
}

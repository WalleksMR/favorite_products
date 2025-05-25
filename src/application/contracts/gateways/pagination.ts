import { Pagination } from '@/domain/contracts/gateways';

export class PaginationOptions {
  restPage: number;
  restLimit: number;
  restMode: Pagination.restMode;

  constructor(input: PaginationOptions) {
    this.restPage = input.restPage;
    this.restLimit = input.restLimit;
    this.restMode = input.restMode;
  }
}

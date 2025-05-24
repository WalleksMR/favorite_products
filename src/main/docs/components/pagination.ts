import { ApiProperty } from '@nestjs/swagger';

import { Pagination } from '@/domain/contracts/gateways';

class _Meta {
  @ApiProperty()
  itemCount: number;
  @ApiProperty()
  totalItems?: number;
  @ApiProperty()
  itemsPerPage: number;
  @ApiProperty()
  totalPages?: number;
  @ApiProperty()
  currentPage: number;
}
export class _PaginationPresenter implements Pagination {
  @ApiProperty({ type: 'object' })
  items: Array<any>;
  @ApiProperty()
  meta: _Meta;
}

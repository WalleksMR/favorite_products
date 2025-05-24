export type Pagination<T = any> = {
  items: Array<T>;
  meta: {
    itemCount: number;
    totalItems?: number;
    itemsPerPage: number;
    totalPages?: number;
    currentPage: number;
  };
};

export namespace Pagination {
  export type Options = {
    RestPage?: number;
    RestLimit?: number;
    RestMode: RestMode;
  };
  export enum RestMode {
    paginate = 'paginate',
    list = 'list',
  }
}

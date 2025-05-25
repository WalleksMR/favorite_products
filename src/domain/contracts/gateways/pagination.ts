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
    restPage?: number;
    restLimit?: number;
    restMode: restMode;
  };
  export enum restMode {
    paginate = 'paginate',
    list = 'list',
  }
}

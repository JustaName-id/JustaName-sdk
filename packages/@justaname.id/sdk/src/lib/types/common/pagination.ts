import { IResponse } from './iroute';

export interface Pagination {
  totalCount: number;

  page: number;

  limit: number;

  totalPages: number;

  nextPage: number | null;

  prevPage: number | null;

  hasNextPage: boolean;

  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> extends IResponse {
  data: T[];
  pagination: Pagination;
}
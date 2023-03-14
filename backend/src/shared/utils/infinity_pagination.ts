import { IPaginationOptions } from './types/pagination_options.type';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
  total: number,
) => {
  return {
    data,
    hasNextPage: data.length === options.limit,
    total,
  };
};

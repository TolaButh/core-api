import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { Repository } from 'typeorm';
import { paginate as _paginate } from 'nestjs-typeorm-paginate';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const paginate = async <T = any>(
  repo: Repository<any>,
  options: IPaginationOptions,
  searchOptions: FindManyOptions = {},
): Promise<IPagination<T>> => {
  const res = await _paginate<T>(
    repo,
    {
      limit: options.limit,
      page: options.page,
    },
    searchOptions,
  );
  return {
    items: res.items,
    total: res.meta.totalItems,
    count: res.meta.itemCount,
    page: res.meta.currentPage,
    limit: options.limit,
  };
};

export class IPagination<T> {
  items: T[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}

export interface IPaginationOptions {
  q?: string;
  limit: number;
  page: number;
}

export class IPaginationResponse<T> {
  data: IPagination<T>;
  message?: string;
}

export const ApiPaginationResponse = (model: any) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          data: {
            properties: {
              total: {
                type: 'number',
                example: 234,
              },
              count: {
                type: 'number',
                example: 30,
              },
              page: {
                type: 'number',
                example: 1,
              },
              limit: {
                type: 'number',
                example: 30,
              },
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        },
      },
    }),
  );
};
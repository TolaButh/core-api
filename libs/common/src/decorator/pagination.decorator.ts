import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
  } from '@nestjs/common';
  import { ApiQuery } from '@nestjs/swagger';
  
  export const PaginationOptions = createParamDecorator(
    (data, ctx: ExecutionContext) => {
      const req = ctx.switchToHttp().getRequest();
      return {
        limit: parseInt(req.query?.limit || CONFIG.PAGE_LIMIT),
        page: parseInt(req.query?.page) || 1,
        q: req.query?.q || '',
      };
    },
  );
  
  export const CONFIG = {
    PAGE_LIMIT: 30,
    PAGE_MAX: 1000,
  };
  
  export const ApiPaginationQuery = () => {
    return applyDecorators(
      ApiQuery({
        name: 'limit',
        example: 5,
        required: false,
      }),
      ApiQuery({
        name: 'page',
        example: 1,
        required: false,
      }),
      ApiQuery({
        name: 'q',
        example: '',
        required: false,
      }),
    );
  };
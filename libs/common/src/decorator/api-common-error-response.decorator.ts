import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiCommonErrorResponse = (): any => {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: {
        type: 'object',
        example: {
          statusCode: 400,
          message: 'Something is wrong',
          error: 'Bad Request',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Error',
      schema: {
        type: 'object',
        example: {
          statusCode: 500,
          message: 'Something is wrong',
          error: 'Internal Error',
        },
      },
    }),
  );
};
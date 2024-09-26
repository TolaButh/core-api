import { CustomError } from './error';
import { HttpStatus } from '@nestjs/common';

export const dbError = new CustomError({
  code: 'DATABASE_ERROR',
  message: 'database error',
  status: HttpStatus.INTERNAL_SERVER_ERROR,
});

export const internalServerError = new CustomError({
  code: 'INTERNAL_SERVER_ERROR',
  message: 'internal server error',
  status: HttpStatus.INTERNAL_SERVER_ERROR,
});

export const findNotFoundError = (name: string) =>
  new CustomError({
    code: `${name.toUpperCase()}_NOT_FOUND`,
    message: `${name} is not found`,
    status: HttpStatus.NOT_FOUND,
  });

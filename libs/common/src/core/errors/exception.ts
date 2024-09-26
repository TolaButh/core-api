import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  import * as Sentry from '@sentry/node';
  import { IError } from './interface';
  import { CustomError } from './error';
  
  export class Exception extends HttpException {
    public customError: IError;
  
    constructor(
      exception: Error | CustomError,
      errorType: IError,
      ...data: any[]
    ) {
      super(errorType.getResponse(), errorType.getStatus());
      this.customError = errorType;
      console.error('exception', exception);
      console.error('message', errorType);
      console.error('more', data);
      if (errorType.getStatus() >= 500) {
        Sentry.setExtra('message', errorType);
        Sentry.setExtra('more', data);
        Sentry.captureException(exception);
      }
    }
  }
  
  @Catch()
  export class HttpExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      if (!(exception instanceof HttpException)) {
        console.error('exception', exception);
        Sentry.captureException(exception);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error',
        });
      }
  
      const status = exception.getStatus();
      return response.status(status).json(exception.getResponse());
    }
  }
  
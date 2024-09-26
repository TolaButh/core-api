import { IError, IErrorFields } from './interface';
import { Exclude, instanceToPlain } from 'class-transformer';

export class CustomError implements IError {
  @Exclude()
  status: number;

  code: string;
  message: any;
  fields?: IErrorFields;
  data?: any;
  originalError?: Error;

  constructor(partial: Partial<CustomError>) {
    Object.assign(this, partial);
  }

  getCode(): string {
    return this.code;
  }

  getData(): any {
    return this.data;
  }

  getFields(): IErrorFields {
    return this.fields;
  }

  getMessage(): any {
    return this.message;
  }

  getResponse(): any {
    return instanceToPlain(this);
  }

  getOriginalError(): Error {
    return this.originalError;
  }

  getStatus(): number {
    return this.status;
  }
}

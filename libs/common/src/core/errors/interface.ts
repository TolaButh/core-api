export interface IErrorFields {
    [key: string]: IError;
  }
  
  export interface IError {
    getStatus: () => number;
  
    getCode: () => string;
  
    getMessage: () => any;
  
    getFields: () => IErrorFields;
  
    getData: () => any;
  
    getOriginalError: () => Error;
  
    getResponse: () => any;
  }
  
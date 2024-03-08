class ApplicationError extends Error {
  module: string;
  type: string;
  statusCode: number;
  responseCode?: any;

  constructor(err: {
    module: string,
    name?: string,
    type?: string,
    message?: string,
    statusCode?: number,
    responseCode?: any
  }) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.module = err.module;
    this.name = err.name || this.constructor.name;
    this.type = err.type || 'ServerError';
    this.message = err.message || 'Something went wrong. Please try again.';
    this.statusCode = err.statusCode || 500;
    this.responseCode = err.responseCode;
  }
}

export default ApplicationError;

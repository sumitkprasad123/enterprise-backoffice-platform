export class AppError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const badRequest = (msg, errors) =>
  new AppError(msg || 'Bad Request', 400, errors);

export const unauthorized = (msg) => new AppError(msg || 'Unauthorized', 401);

export const forbidden = (msg) => new AppError(msg || 'Forbidden', 403);

export const notFound = (msg) => new AppError(msg || 'Resource not found', 404);

export const conflict = (msg) => new AppError(msg || 'Conflict', 409);

export const internalError = (msg) =>
  new AppError(msg || 'Internal server error', 500);

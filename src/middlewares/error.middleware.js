import { env } from '../config/env.js';
import { AppError } from '../utils/appError.js';
import { handlePrismaError } from '../utils/prismaErrorHandler.js';

const sendDevError = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || null,
    });
  } else {
    // Unknown / programming error
    console.error('🔥 UNEXPECTED ERROR:', err);

    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const errorHandler = (err, req, res, next) => {
  const error = err;

  // Prisma error normalization
  error = handlePrismaError(error);

  // Ensure AppError shape
  if (!(error instanceof AppError)) {
    error = new AppError(error.message || 'Internal Error', 500);
  }

  if (env.nodeEnv === 'development') {
    sendDevError(error, res);
  } else {
    sendProdError(error, res);
  }
};

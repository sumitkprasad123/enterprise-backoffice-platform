import { mapPrismaError } from '../utils/prismaErrorMapper.js';

export const errorHandler = (err, req, res, next) => {
  const mappedError = mapPrismaError(err);

  const statusCode = mappedError.statusCode || 500;

  res.status(statusCode).json({
    message: mappedError.message || 'Internal Server Error',
  });
};

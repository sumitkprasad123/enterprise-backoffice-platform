import { Prisma } from '@prisma/client';
import { AppError } from './appError.js';

export function handlePrismaError(error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new AppError(409, 'Resource already exists');
      case 'P2025':
        return new AppError(404, 'Resource not found');
      default:
        return new AppError(400, 'Database error');
    }
  }

  return error;
}

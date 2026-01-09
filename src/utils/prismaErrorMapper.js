import { Prisma } from '@prisma/client';
import { HttpError } from './httpError.js';

export function mapPrismaError(error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new HttpError(409, 'Resource already exists');
      case 'P2025':
        return new HttpError(404, 'Resource not found');
      default:
        return new HttpError(400, 'Database error');
    }
  }

  return error;
}

import prisma from '../config/prisma.js';

export const runTransaction = async (callback) => {
  return prisma.$transaction(async (tx) => {
    return callback(tx);
  });
};

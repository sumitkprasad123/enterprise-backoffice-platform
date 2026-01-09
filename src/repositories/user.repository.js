import prisma from '../config/prisma.js';

export const userRepository = {
  create: (data) => {
    return prisma.user.create({ data });
  },

  findById: (id) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  findByEmail: (email) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  updateById: (id, data) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  deleteById: (id) => {
    return prisma.user.delete({
      where: { id },
    });
  },
};

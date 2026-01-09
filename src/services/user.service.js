import { userRepository } from '../repositories/user.repository.js';

export const createUser = async (payload) => {
  return userRepository.create(payload);
};

export const getUserByEmail = async (email) => {
  return userRepository.findByEmail(email);
};

import { createUser } from '../services/user.service.js';

export const createUserController = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

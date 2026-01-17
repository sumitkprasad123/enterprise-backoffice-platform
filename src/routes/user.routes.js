import express from 'express';
import { createUserController } from '../controllers/user.controller.js';

const userRouter = express.Router();

//create user
userRouter.post('/', createUserController);

export default userRouter;

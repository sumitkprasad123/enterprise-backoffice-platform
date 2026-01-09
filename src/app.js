import express from 'express';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running' });
});

import { errorHandler } from './middlewares/error.middleware.js';

export default app;

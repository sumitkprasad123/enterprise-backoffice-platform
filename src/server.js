import app from './app.js';
import prisma from './config/prisma.js';
import { env } from './config/env.js';

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port} in ${env.nodeEnv} mode.`);
});

const shutdown = async (signal) => {
  console.log(`Received ${signal}`);
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

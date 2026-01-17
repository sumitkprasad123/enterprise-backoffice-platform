import app from './app.js';
import prisma from './config/prisma.js';
import { env } from './config/env.js';

const server = app.listen(env.port, async () => {
  try {
    await prisma.$connect();
    console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

let isShuttingDown = false;
const shutdown = async (signal) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\nReceived ${signal}. Shutting down gracefully...`);

  server.close(async () => {
    console.log('HTTP server closed');

    try {
      await prisma.$disconnect();
      console.log('Prisma disconnected');
    } catch (err) {
      console.error('Error during Prisma disconnect:', err);
    } finally {
      process.exit(0);
    }
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

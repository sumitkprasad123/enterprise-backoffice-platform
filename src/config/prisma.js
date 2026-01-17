import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from './env.js';

const adapter = new PrismaPg({
  connectionString: env.databaseUrl,
});

const prisma = new PrismaClient({
  adapter,
  log:
    env.nodeEnv === 'production'
      ? ['warn', 'error']
      : ['query', 'info', 'warn', 'error'],
});

export default prisma;

import { PrismaClient } from '@prisma/client';

export * from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

// Ops Directive: Enable WAL mode for high-performance concurrency
prisma.$connect().then(() => {
  prisma.$executeRawUnsafe('PRAGMA journal_mode=WAL;');
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

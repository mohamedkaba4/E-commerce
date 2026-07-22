import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const getPrismaClient = () => {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });

  return new PrismaClient({ adapter });
};

declare global {
  var prismaAuthGlobal: ReturnType<typeof getPrismaClient> | undefined;
}

export const prismaAuth =
  globalThis.prismaAuthGlobal ?? getPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaAuthGlobal = prismaAuth;
}

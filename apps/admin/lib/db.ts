import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ 
  connectionString,
  max: 5,                  // Restricts this specific instance to 5 concurrent connections max
  idleTimeoutMillis: 30000 // Closes idle connections after 30 seconds to free up Neon capacity
});
const adapter = new PrismaPg(pool);

export const db = 
  globalForPrisma.prisma || 
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

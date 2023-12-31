import { PrismaClient } from '../../../prisma/generated/client';

export const prisma = new PrismaClient();

export const connectPrisma = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error('Failed to connect DB');
  }
};

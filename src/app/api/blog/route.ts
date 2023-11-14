import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const connectPrisma = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error('Failed to connect DB');
  }
};

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await connectPrisma();
    const posts = await prisma.post.findMany();
    return NextResponse.json(
      {
        message: 'Success to get all posts',
        data: posts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error',
        data: error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect;
  }
};

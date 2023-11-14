import { NextResponse } from 'next/server';
import { connectPrisma } from '../route';

export const GET = async () => {
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
    prisma.$disconnect;
  }
};

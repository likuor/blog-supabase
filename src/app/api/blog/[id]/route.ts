import { NextResponse } from 'next/server';
import { connectPrisma, prisma } from '../route';

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await connectPrisma();
    const id: number = parseInt(req.url.split('/blog/')[1]);
    const post = await prisma.post.findFirst({ where: { id } });

    return NextResponse.json(
      {
        message: 'Success to get a post',
        data: post,
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

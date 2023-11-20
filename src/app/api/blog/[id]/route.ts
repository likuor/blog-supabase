import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../prisma/generated/client';

const prisma = new PrismaClient();

const connectPrisma = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error('Failed to connect DB');
  }
};

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

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    await connectPrisma();
    const id: number = parseInt(req.url.split('/blog/')[1]);
    const { title, description } = await req.json();

    const post = await prisma.post.update({
      data: { title, description },
      where: { id },
    });

    return NextResponse.json(
      {
        message: 'Success to update a post',
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

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    await connectPrisma();
    const id: number = parseInt(req.url.split('/blog/')[1]);

    const post = await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: 'Success to delete a post',
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

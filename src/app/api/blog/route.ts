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

export async function GET() {
  // export const GET = async () => {
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
}

export async function POST(req: Request) {
  // export const POST = async (req: Request) => {
  try {
    await connectPrisma();
    const { title, description } = await req.json();
    const post = await prisma.post.create({
      data: { title, description },
    });

    return NextResponse.json(
      {
        message: 'Success to create a post',
        data: post,
      },
      { status: 201 }
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
}

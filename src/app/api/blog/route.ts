import { connectPrisma, prisma } from '@/app/utils/connectPrisma';
import { NextResponse } from 'next/server';

export async function GET() {
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

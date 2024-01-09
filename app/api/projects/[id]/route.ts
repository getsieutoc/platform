import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { session, isAdmin } = await getSession();

    if (!session) {
      throw new Error('Unauthorized request');
    }

    const projectId = decodeURIComponent(params.id);

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        users: isAdmin ? {} : { some: { id: session.user.id } },
      },
      include: { users: true },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Problem when query Project by Id' });
  }
}

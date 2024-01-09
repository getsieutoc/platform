import { paramParser, queryParser } from '@/lib/parsers';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const { session, isAdmin } = await getSession();

    // only slug request is public
    const slug = searchParams.get('slug');

    if (slug) {
      const foundProject = await prisma.project.findUnique({
        where: {
          slug,
        },
      });

      return NextResponse.json(foundProject);
    }

    if (!session) {
      throw new Error('Unauthorized request');
    }

    const entries = queryParser(searchParams.toString());

    const whereInput =
      'where' in entries ? (entries['where'] as Prisma.ProjectWhereInput) : {};

    const finalWhere = isAdmin
      ? whereInput
      : {
          // override with projects belong to current user only
          ...whereInput,
          users: { some: { id: session.user.id } },
        };

    const count = searchParams.get('count');

    if (count === 'true') {
      const numProjects = await prisma.project.count({
        where: finalWhere,
      });

      return NextResponse.json(numProjects);
    }

    const skip = paramParser(searchParams.get('skip'));

    const take = paramParser(searchParams.get('take'));

    const response = await prisma?.project.findMany({
      include: { users: true },
      where: finalWhere,
      skip,
      take,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Problem when query project' });
  }
}

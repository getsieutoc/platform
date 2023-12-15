import { Flex, Heading, Text, Wrap, WrapItem } from '@/components/chakra';
import { NextImage } from '@/components/client';
import { parseQuery } from '@/lib/utils';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import { ProjectCard } from './ProjectCard';

export const Projects = async ({ limit }: { limit?: number }) => {
  const { session, isAdmin } = await getSession();

  if (!session) {
    return null;
  }

  const projects = await prisma.project.findMany({
    take: parseQuery(limit),
    where: isAdmin ? {} : { users: { some: { id: session.user.id } } },
    orderBy: { createdAt: 'asc' },
  });

  return projects.length > 0 ? (
    <Wrap spacing={6}>
      {projects.map((project) => (
        <WrapItem key={project.id}>
          <ProjectCard data={project} />
        </WrapItem>
      ))}
    </Wrap>
  ) : (
    <Flex direction="column" alignItems="center">
      <Heading as="h1" size="3xl" color="gray">
        No Projects Yet
      </Heading>

      <NextImage priority alt="missing" src="/web-design.svg" width={400} height={400} />

      <Text className="text-lg text-stone-500">
        You do not have any projects yet. Create one to get started.
      </Text>
    </Flex>
  );
};

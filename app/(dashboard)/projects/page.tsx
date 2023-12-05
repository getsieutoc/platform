import { Flex, Heading, Skeleton, Wrap, WrapItem } from '@/components/chakra';
import { MAX_PROJECTS } from '@/lib/constants';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@/types';
import { Suspense } from 'react';

import { CreateNewButton, Projects } from './components';

export default async function ProjectsPageView() {
  const { session } = await getSession();

  const isAdmin = session?.user?.role === UserRole.ADMIN;

  const projectsNum = await prisma.project.count({
    where: isAdmin ? {} : { userId: session?.user.id },
  });

  const displayProjects = isAdmin ? projectsNum : `${projectsNum}/${MAX_PROJECTS}`;

  const isDisabledNewProject = isAdmin ? false : projectsNum === MAX_PROJECTS;

  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex
        width="100%"
        height="48px"
        direction="row"
        justify="space-between"
        align="center"
        gap={6}
      >
        <Heading as="h1" size="lg">
          Projects ({displayProjects})
        </Heading>

        <CreateNewButton isDisabled={isDisabledNewProject} />
      </Flex>
      <Suspense
        fallback={
          <Wrap spacing={6}>
            {Array.from({ length: 3 }).map((_, i) => (
              <WrapItem key={i}>
                <Skeleton height="40px" />
              </WrapItem>
            ))}
          </Wrap>
        }
      >
        <Projects limit={9} />
      </Suspense>
    </Flex>
  );
}

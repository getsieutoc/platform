import { notFound } from 'next/navigation';
import { Flex } from '@/components/chakra';
import { prisma } from '@/lib/prisma';
import { ReactNode } from '@/types';

import { ProjectTitle } from './components';

export default async function SingleProjectLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const data = await prisma.project.findUnique({
    where: { id: params.id },
    include: { users: true },
  });

  if (!data) {
    notFound();
  }

  return (
    <Flex width="100%" height="100%" direction="column" gap={6}>
      <ProjectTitle />

      {children}
    </Flex>
  );
}

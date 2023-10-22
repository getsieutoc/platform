import { notFound, redirect } from 'next/navigation';
import { Flex, Heading } from '@/components/chakra';
import type { ReactNode } from 'react';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export default async function SiteAnalyticsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const data = await prisma.site.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!data) {
    notFound();
  }

  if (session.user.role !== UserRole.ADMIN && data.userId !== session.user.id) {
    redirect('/sites');
  }

  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex height="48px" align="center">
        <Heading as="h1" size="lg">
          {data.name}
        </Heading>
      </Flex>

      {children}
    </Flex>
  );
}

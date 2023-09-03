import { notFound, redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { Flex, Heading } from '@/components';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
    where: {
      id: params.id,
    },
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
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

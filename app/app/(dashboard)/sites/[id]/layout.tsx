import { notFound } from 'next/navigation';
import { Flex, Heading } from '@/components/chakra';
import type { ReactNode } from 'react';

import { prisma } from '@/lib/prisma';

export default async function SingleSiteLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const data = await prisma.site.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!data) {
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

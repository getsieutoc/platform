import { redirect } from 'next/navigation';

import { parseQuery } from '@/lib/utils';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Flex, Heading, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { NextImage, SiteCard } from '@/components/client';

export const Sites = async ({ limit }: { limit?: number }) => {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const sites = await prisma.site.findMany({
    take: parseQuery(limit),
    where: { user: { id: session.user.id } },
    orderBy: { createdAt: 'asc' },
  });

  return sites.length > 0 ? (
    <Wrap spacing={6}>
      {sites.map((site) => (
        <WrapItem key={site.id}>
          <SiteCard data={site} />
        </WrapItem>
      ))}
    </Wrap>
  ) : (
    <Flex direction="column" alignItems="center">
      <Heading as="h1" size="3xl" color="gray">
        No Sites Yet
      </Heading>

      <NextImage
        alt="missing site"
        src="https://illustrations.popsy.co/gray/web-design.svg"
        width={400}
        height={400}
      />

      <Text className="text-lg text-stone-500">
        You do not have any sites yet. Create one to get started.
      </Text>
    </Flex>
  );
};

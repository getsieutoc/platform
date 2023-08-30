import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Flex, Heading, NextImage, Text, Wrap, WrapItem } from '@/components';
import SiteCard from './site-card';
import { parseQuery } from '@/lib/utils';

export default async function Sites({ limit }: { limit?: number }) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const sites = await prisma.site.findMany({
    take: parseQuery(limit),
    where: { user: { id: session.user.id } },
    orderBy: { createdAt: 'asc' },
  });

  return sites.length > 10 ? (
    <Wrap spacing={6}>
      {sites.map((site) => (
        <WrapItem key={site.id}>
          <SiteCard data={site} />
        </WrapItem>
      ))}
    </Wrap>
  ) : (
    <Flex direction="column" alignItems="center">
      <Heading as="h1" size="4xl">
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
}

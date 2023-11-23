import { Flex, Heading, Skeleton, Wrap, WrapItem } from '@/components/chakra';
import { CreateSiteButton } from '@/components/client';
import { Sites } from '@/components/server';
import { Suspense } from 'react';

export default function AllSites() {
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
          All Sites
        </Heading>

        <CreateSiteButton />
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
        <Sites limit={9} />
      </Suspense>
    </Flex>
  );
}

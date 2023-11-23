import { Flex, Heading, Skeleton } from '@/components/chakra';
import { Suspense } from 'react';

import { Sites } from '@/components/server';

export default function Overview() {
  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex height="48px" align="center">
        <Heading as="h1" size="lg">
          Overview
        </Heading>
      </Flex>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Heading as="h3" size="md">
            Top Sites
          </Heading>
        </div>
        <Suspense fallback={<Skeleton height="20px" />}>
          <Sites limit={1} />
        </Suspense>
      </div>
    </Flex>
  );
}

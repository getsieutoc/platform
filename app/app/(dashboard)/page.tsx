import { Suspense } from 'react';
import Sites from '@/components/sites';
import OverviewStats from '@/components/overview-stats';
import PlacholderCard from '@/components/placeholder-card';
import { Flex, Heading } from '@/components';

export default function Overview() {
  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex height="48px" align="center">
        <Heading as="h1" size="lg">
          Overview
        </Heading>
      </Flex>

      <OverviewStats />

      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Heading as="h3" size="md">
            Top Sites
          </Heading>
        </div>
        <Suspense fallback={<PlacholderCard />}>
          <Sites limit={1} />
        </Suspense>
      </div>
    </Flex>
  );
}

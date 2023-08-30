import { Suspense } from 'react';
import Sites from '@/components/sites';
import OverviewStats from '@/components/overview-stats';
import PlacholderCard from '@/components/placeholder-card';
import OverviewSitesCTA from '@/components/overview-sites-cta';
import { Flex, Heading } from '@/components';

export default function Overview() {
  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex>
        <Heading as="h1" size="lg">
          Overview
        </Heading>

        <OverviewStats />
      </Flex>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">Top Sites</h1>
          <Suspense fallback={null}>
            <OverviewSitesCTA />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <PlacholderCard key={i} />
              ))}
            </div>
          }
        >
          <Sites limit={2} />
        </Suspense>
      </div>

      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">Recent Posts</h1>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlacholderCard key={i} />
              ))}
            </div>
          }
        ></Suspense>
      </div>
    </Flex>
  );
}

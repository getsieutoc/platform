import { Suspense } from 'react';
import Sites from '@/components/sites';
import PlacholderCard from '@/components/placeholder-card';
import CreateSiteButton from '@/components/create-site-button';
import { Flex, Heading, Wrap, WrapItem } from '@/components';

export default function AllSites({ params }: { params: { id: string } }) {
  console.log('### params: ', { params });

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
            {Array.from({ length: 6 }).map((_, i) => (
              <WrapItem key={i}>
                <PlacholderCard />
              </WrapItem>
            ))}
          </Wrap>
        }
      >
        <Sites limit={6} />
      </Suspense>
    </Flex>
  );
}

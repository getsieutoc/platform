'use client';

import { Card, Text, Heading, Flex, SimpleGrid } from '@chakra-ui/react';

export const chartdata = [
  {
    date: 'Jan 23',
    Visitors: 2890,
  },
  {
    date: 'Feb 23',
    Visitors: 2756,
  },
  {
    date: 'Mar 23',
    Visitors: 3322,
  },
  {
    date: 'Apr 23',
    Visitors: 3470,
  },
  {
    date: 'May 23',
    Visitors: 3475,
  },
  {
    date: 'Jun 23',
    Visitors: 3129,
  },
];

const pages = [
  { name: '/platforms-starter-kit', value: '1,230' },
  { name: '/vercel-is-now-bercel', value: 751 },
  { name: '/nextjs-conf', value: 471 },
  { name: '/150m-series-d', value: 280 },
  { name: '/about', value: 78 },
];

const referrers = [
  { name: 't.co', value: 453 },
  { name: 'vercel.com', value: 351 },
  { name: 'linkedin.com', value: 271 },
  { name: 'google.com', value: 191 },
  {
    name: 'news.ycombinator.com',
    value: 71,
  },
];

const countries = [
  { name: 'United States of America', value: 789, code: 'US' },
  { name: 'India', value: 676, code: 'IN' },
  { name: 'Germany', value: 564, code: 'DE' },
  { name: 'United Kingdom', value: 234, code: 'GB' },
  { name: 'Spain', value: 191, code: 'ES' },
];

const categories = [
  {
    title: 'Top Pages',
    subtitle: 'Page',
    data: pages,
  },
  {
    title: 'Top Referrers',
    subtitle: 'Source',
    data: referrers,
  },
  {
    title: 'Countries',
    subtitle: 'Country',
    data: countries,
  },
];

export default function AnalyticsMockup() {
  return (
    <div className="grid gap-6">
      <Card>
        <Heading as="h2">Visitors</Heading>
      </Card>
      <SimpleGrid columns={{ sm: 2, lg: 3 }} spacing={6}>
        {categories.map(({ title, subtitle }) => (
          <Card key={title}>
            <Heading as="h3">{title}</Heading>
            <Flex marginTop={2}>
              <Text fontWeight="bold">{subtitle}</Text>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
}

import { formatRelative } from '@/lib/utils';
import { Site } from '@/types';

import { Heading, Text, Card, CardBody, Stack, CardFooter } from '@/components/chakra';
import { NextLink } from '../NextLink';

export const SiteCard = ({ data }: { data: Site }) => {
  return (
    <Card
      as={NextLink}
      href={`/sites/${data.id}`}
      maxW="md"
      minW="sm"
      minH="173px" // I know it's magic number, but it works for now
      _hover={{
        boxShadow: 'xl',
      }}
    >
      <CardBody>
        <Stack mt="3" spacing="3">
          <Heading as="h2" size="md">
            {data.name}
          </Heading>
          <Text>{data.description}</Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <Text fontSize="sm">Updated {formatRelative(data.updatedAt)}</Text>
      </CardFooter>
    </Card>
  );
};

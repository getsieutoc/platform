import { NextLink, Heading, Text, Card, CardBody, Stack, CardFooter } from '@/components';
import { formatRelative } from '@/lib/utils';
import { Site } from '@/types';

export default function SiteCard({ data }: { data: Site }) {
  return (
    <Card
      as={NextLink}
      href={`/sites/${data.id}`}
      maxW="md"
      minW="sm"
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
}

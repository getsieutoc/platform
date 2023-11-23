'use client';

import slugify from 'slugify';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Skeleton,
  Stack,
  Text,
  Textarea,
} from '@/components/chakra';
import { useAuth, useColorModeValue, useDebounce, useState } from '@/hooks';
import { updateSiteSimple } from '@/lib/actions/site';
import { Site } from '@/types';

export type SiteGeneralSettingsFormProps = {
  site: Site;
};

export const SiteGeneralSettingsForm = ({ site }: SiteGeneralSettingsFormProps) => {
  const { update } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    name: site?.name ?? '',
    slug: site?.slug ?? '',
    description: site?.description ?? '',
  });

  const siteId = site?.id ?? '';

  useDebounce(
    () => {
      setData((prev) => ({
        ...prev,
        slug: slugify(prev.name).toLowerCase(),
      }));
    },
    200,
    [data.name]
  );

  const handleSave = async () => {
    try {
      if (!siteId) return;

      setIsLoading(true);

      const res = await updateSiteSimple(siteId, data);

      if (res) {
        update();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

  if (!data) {
    return <Skeleton height="40px" />;
  }

  return (
    <Card direction="column" width="100%">
      <CardHeader>
        <Heading size="md">General Settings</Heading>
      </CardHeader>
      <CardBody pt="0" borderBottomColor={borderColor} borderBottomWidth="1px">
        <Stack spacing={6} maxW="480px" minW="240px">
          <FormControl isDisabled={isLoading}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Site name"
              value={data.name ?? ''}
              onChange={(event) => setData(() => ({ ...data, name: event.target.value }))}
            />
          </FormControl>

          <FormControl isDisabled={isLoading}>
            <FormLabel>Slug</FormLabel>
            <Input
              placeholder="Slug"
              value={data.slug ?? ''}
              onChange={(event) => setData(() => ({ ...data, slug: event.target.value }))}
            />
          </FormControl>

          <FormControl isDisabled={isLoading}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Site description"
              rows={3}
              value={data.description ?? ''}
              onChange={(event) =>
                setData(() => ({ ...data, description: event.target.value }))
              }
            />
          </FormControl>
        </Stack>
      </CardBody>

      <CardFooter>
        <Flex width="100%" direction="row" justify="space-between" align="center">
          <Text fontSize="sm">
            The information here mostly used for management, the site real data might be
            different.
          </Text>

          <Button
            colorScheme="green"
            isDisabled={isLoading}
            isLoading={isLoading}
            onClick={handleSave}
          >
            Save
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

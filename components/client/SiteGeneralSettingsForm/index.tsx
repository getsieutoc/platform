'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Skeleton,
  Stack,
  Text,
  Textarea,
} from '@/components';
import { updateSiteGeneralSettings } from '@/lib/actions/site';
import { useAuth, useColorModeValue, useState } from '@/hooks';
import { Site } from '@/types';

type SiteGeneralSettingsFormProps = {
  site: Site | null;
};
export const SiteGeneralSettingsForm = ({ site }: SiteGeneralSettingsFormProps) => {
  const { update } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    name: site?.name ?? '',
    description: site?.description ?? '',
  });

  const siteId = site?.id ?? '';

  const handleSave = async () => {
    try {
      if (!siteId) return;

      setIsLoading(true);

      const res = await updateSiteGeneralSettings(siteId, data);

      if (res) {
        update();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  if (!data) {
    return <Skeleton height="40px" />;
  }

  return (
    <Card direction="column" width="100%">
      <CardBody>
        <Stack spacing={6} maxW="480px" minW="240px">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Site name"
              value={data.name ?? ''}
              onChange={(event) => setData(() => ({ ...data, name: event.target.value }))}
            />
          </FormControl>

          <FormControl>
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

      <Divider color={footerBorder} />

      <CardFooter>
        <Flex width="100%" direction="row" justify="space-between">
          <Text fontSize="sm">
            The information here mostly used for management, the site real data might be
            different.
          </Text>

          <Button
            colorScheme="pink"
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

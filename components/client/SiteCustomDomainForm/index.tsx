'use client';

import {
  removeDomainFromProject,
  addDomainToProject,
  findProject,
} from '@/lib/actions/vercel';
import { useColorModeValue, useState } from '@/hooks';
import { updateSiteSimple } from '@/lib/actions/site';
import { IS_PRODUCTION } from '@/lib/constants';
import type { Site } from '@/types';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { DomainConfiguration } from '../DomainConfiguration';

type SiteCustomDomainFormProps = {
  site: Site | null;
};

// We will continue to work on this soon
export const SiteCustomDomainForm = ({ site }: SiteCustomDomainFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [customDomain, setCustomDomain] = useState(site?.customDomain ?? '');

  const handleSave = async () => {
    try {
      if (!site || IS_PRODUCTION) return;

      setIsLoading(true);

      const res = await updateSiteSimple(site.id, { subdomain: customDomain });

      const project = await findProject(site.id);

      if (res && project) {
        await removeDomainFromProject(project.id, `${site.subdomain}.sieutoc.website`);

        await addDomainToProject(project.id, `${customDomain}.sieutoc.website`);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const validChanges = customDomain.length > 3 && customDomain !== site?.customDomain;

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  if (!site) {
    return <Skeleton height="40px" />;
  }

  return (
    <>
      <Card direction="column" width="100%">
        <CardHeader>
          <Heading size="md">Custom Domain (Coming Soon!)</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6} maxW="480px" minW="240px">
            <FormControl isDisabled={true || isLoading}>
              <FormLabel>Custom Domain for your site</FormLabel>
              <Input
                placeholder="yourdomain.com"
                maxLength={64}
                pattern="^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$"
                value={customDomain}
                onChange={(event) => setCustomDomain(event.target.value)}
              />
            </FormControl>

            {customDomain && (
              <DomainConfiguration siteId={site.id} domain={customDomain} />
            )}
          </Stack>
        </CardBody>

        <Divider color={footerBorder} />

        <CardFooter>
          <Flex width="100%" direction="row" justify="space-between" align="center">
            <Text fontSize="sm">Please use 64 characters maximum</Text>

            <Button
              colorScheme={validChanges ? 'green' : 'gray'}
              isDisabled={true || !validChanges || isLoading}
              isLoading={isLoading}
              onClick={handleSave}
            >
              Save
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};

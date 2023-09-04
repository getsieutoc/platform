'use client';

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
} from '@/components';
import {
  removeDomainFromProject,
  addDomainToProject,
  findProject,
} from '@/lib/actions/vercel';
import { useColorModeValue, useDebounce, useState } from '@/hooks';
import { updateSiteSimple } from '@/lib/actions/site';
import type { Site } from '@/types';

import DomainStatus from '@/components/form/domain-status';
import DomainConfiguration from '@/components/form/domain-configuration';

type SiteCustomDomainFormProps = {
  site: Site | null;
};

export const SiteCustomDomainForm = ({ site }: SiteCustomDomainFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [customDomain, setCustomDomain] = useState(site?.customDomain ?? '');

  useDebounce(
    () => {
      // const isSubdomainAvailable = await checkSubdomainValid(slug);
      console.log('### isSubdomainAvailable: ');
    },
    600,
    [customDomain]
  );

  const handleSave = async () => {
    try {
      if (!site) return;

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
          <Heading size="md">Custom Domain</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6} maxW="480px" minW="240px">
            <FormControl isDisabled={isLoading}>
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
              isDisabled={!validChanges || isLoading}
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

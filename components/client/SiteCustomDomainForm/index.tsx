'use client';

import {
  removeDomainFromProject,
  addDomainToProject,
  findProject,
} from '@/lib/actions/vercel';
import { useColorModeValue, useState } from '@/hooks';
import { updateSiteSimple } from '@/lib/actions/site';
import { validDomainRegex } from '@/lib/domains';

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
} from '@/components/chakra';
import { Site } from '@/types';

import { DomainConfiguration } from '../DomainConfiguration';

type SiteCustomDomainFormProps = {
  site: Site | null;
};

export const SiteCustomDomainForm = ({ site }: SiteCustomDomainFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [customDomain, setCustomDomain] = useState(site?.customDomain ?? '');

  const validDomain = validDomainRegex.test(customDomain);

  const hasChanged = customDomain.length > 0 && customDomain !== site?.customDomain;

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  const handleSave = async () => {
    try {
      if (!site || !validDomain) return;

      setIsLoading(true);

      const response = await updateSiteSimple(site.id, { customDomain });

      const project = await findProject(site.id);

      if (response && project) {
        await removeDomainFromProject(project.id, customDomain);

        await addDomainToProject(project.id, customDomain);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

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
          <Stack spacing={6}>
            <FormControl isDisabled={isLoading} maxW="480px" minW="240px">
              <FormLabel>Custom Domain</FormLabel>
              <Input
                isInvalid={hasChanged && !validDomain}
                placeholder="yourdomain.com"
                maxLength={64}
                value={customDomain}
                onChange={(event) => setCustomDomain(event.target.value)}
              />
            </FormControl>

            {hasChanged && validDomain && (
              <DomainConfiguration siteId={site.id} domain={customDomain} />
            )}
          </Stack>
        </CardBody>

        <Divider color={footerBorder} />

        <CardFooter>
          <Flex width="100%" direction="row" justify="space-between" align="center">
            <Text fontSize="sm">Use 64 characters maximum.</Text>

            <Button
              colorScheme={hasChanged && validDomain ? 'green' : 'gray'}
              isDisabled={!hasChanged || !validDomain || isLoading}
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

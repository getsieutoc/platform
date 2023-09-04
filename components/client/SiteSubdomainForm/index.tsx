'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
} from '@/components';
import { SubdomainInput } from '@/components/client';
import { updateSiteSimple } from '@/lib/actions/site';
import { useAuth, useColorModeValue, useDebounce, useState } from '@/hooks';
import { Site } from '@/types';
import {
  addDomainToProject,
  findProject,
  removeDomainFromProject,
} from '@/lib/actions/vercel';
import slugify from 'slugify';

const SUBDOMAIN_MAX_LENGTH = 24;

export type SiteSubdomainFormProps = {
  site: Site | null;
};

export const SiteSubdomainForm = ({ site }: SiteSubdomainFormProps) => {
  const { update } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [subdomain, setSubdomain] = useState(site?.subdomain ?? '');

  useDebounce(
    () => {
      const slug = slugify(subdomain);
      setSubdomain(slug);
    },
    600,
    [subdomain]
  );

  const handleSave = async () => {
    try {
      if (!site) return;

      setIsLoading(true);

      const res = await updateSiteSimple(site.id, { subdomain });

      const project = await findProject(site.id);

      if (res && project) {
        await removeDomainFromProject(project.id, `${site.subdomain}.sieutoc.website`);

        await addDomainToProject(project.id, `${subdomain}.sieutoc.website`);

        update();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const validChanges = subdomain.length > 3 && subdomain !== site?.subdomain;

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  if (!site) {
    return <Skeleton height="40px" />;
  }

  return (
    <Card direction="column" width="100%">
      <CardHeader>
        <Heading size="md">Subdomain</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={6} maxW="480px" minW="240px">
          <SubdomainInput
            label="You can change the subdomain here"
            isDisabled={isLoading}
            placeholder={subdomain}
            isInvalid={subdomain.length < 3 || subdomain.length > SUBDOMAIN_MAX_LENGTH}
            value={subdomain}
            onChange={(event) => setSubdomain(event.target.value)}
          />
        </Stack>
      </CardBody>

      <Divider color={footerBorder} />

      <CardFooter>
        <Flex width="100%" direction="row" justify="space-between" align="center">
          <Text
            fontSize="sm"
            color={subdomain.length > SUBDOMAIN_MAX_LENGTH ? 'red' : 'gray'}
          >
            Please use {SUBDOMAIN_MAX_LENGTH} characters maximum
          </Text>

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
  );
};

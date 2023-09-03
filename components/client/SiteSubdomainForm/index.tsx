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
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Skeleton,
  Stack,
  Text,
} from '@/components';
import { updateSiteSimple } from '@/lib/actions/site';
import { useAuth, useColorModeValue, useState } from '@/hooks';
import { Site } from '@/types';
import {
  addDomainToVercel,
  findProject,
  removeDomainFromVercel,
} from '@/lib/actions/vercel';

type SiteGeneralSettingsFormProps = {
  site: Site | null;
};
export const SiteSubdomainForm = ({ site }: SiteGeneralSettingsFormProps) => {
  const { update } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [subdomain, setSubdomain] = useState(site?.subdomain ?? '');

  const handleSave = async () => {
    try {
      if (!site) return;

      setIsLoading(true);

      const res = await updateSiteSimple(site.id, { subdomain });

      const project = await findProject(site.id);

      if (res && project) {
        await removeDomainFromVercel(project.id, `${site.subdomain}.sieutoc.website`);

        await addDomainToVercel(project.id, `${subdomain}.sieutoc.website`);

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
          <FormControl isDisabled={isLoading}>
            <FormLabel>Subdomain for your site</FormLabel>
            <InputGroup>
              <InputLeftAddon color="gray">
                <Text>https://</Text>
              </InputLeftAddon>
              <Input
                placeholder={subdomain}
                value={subdomain}
                onChange={(event) => setSubdomain(event.target.value)}
              />
              <InputRightAddon color="gray">
                <Text>.sieutoc.website</Text>
              </InputRightAddon>
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>

      <Divider color={footerBorder} />

      <CardFooter>
        <Flex width="100%" direction="row" justify="space-between" align="center">
          <Text fontSize="sm">Please use 32 characters maximum</Text>

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

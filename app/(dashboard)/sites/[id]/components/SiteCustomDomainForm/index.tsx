'use client';

import { useColorModeValue, useState } from '@/hooks';
import { updateSite } from '@/lib/actions/site';
import { validDomainRegex } from '@/lib/domains';

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Link,
  Stack,
  Text,
} from '@/components/chakra';
import {
  DeleteIcon,
  ExternalLinkIcon,
  FlashIcon,
  RepeatIcon,
  SaveIcon,
  SmallAddIcon,
} from '@/icons';
import { Service, Site } from '@/types';
import { updateDomains } from '@/lib/actions/easypanel';
import { Copyable } from '@/components/client';

type SiteCustomDomainFormProps = {
  site: Site;
  service: Service;
};

export const SiteCustomDomainForm = ({ site, service }: SiteCustomDomainFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const cleanDomains = (service.domains ?? []).filter(
    (d) => !d.host.includes('easypanel.host')
  );

  const [customDomain, setCustomDomain] = useState(site.customDomain);

  const validDomain =
    customDomain !== null &&
    customDomain.length > 0 &&
    validDomainRegex.test(customDomain);

  const hasChanged =
    site.customDomain === null ? validDomain : customDomain !== site.customDomain;

  const validChanged = hasChanged && (validDomain || customDomain === '');

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  const handleSave = async () => {
    try {
      if (!validChanged) return;

      setIsLoading(true);

      const finalDomains =
        customDomain === ''
          ? (service.domains ?? []).filter((d) => d.host !== site.customDomain)
          : [
              {
                host: customDomain,
                https: true,
                path: '/',
                port: 80,
              },
              ...(service.domains ?? []),
            ];

      await updateSite(site.id, { customDomain });

      await updateDomains({
        id: site.id,
        domains: finalDomains,
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const generateSubdomain = async () => {
    await updateDomains({
      id: site.id,
      domains: [
        {
          host: `${site.slug}.sieutoc.website`,
          https: true,
          path: '/',
          port: 80,
        },
        ...(service.domains ?? []),
      ],
    });
  };

  const removeSubdomain = async (host: string) => {
    // We don't use cleanDomains because we want to keep the default subdomain
    const remained = (service.domains ?? []).filter((d) => d.host !== host);

    await updateDomains({
      id: site.id,
      domains: remained,
    });
  };

  return (
    <>
      <Card direction="column" width="100%">
        <CardHeader>
          <Heading size="md">Manage Domains</Heading>
        </CardHeader>

        <CardBody pt={0}>
          <Stack spacing={6}>
            <Box>
              {cleanDomains.length === 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="purple"
                  leftIcon={<FlashIcon />}
                  onClick={generateSubdomain}
                >
                  Generate subdomain
                </Button>
              )}
              {cleanDomains.length > 0 &&
                cleanDomains.map((d) => (
                  <Flex key={d.host} direction="row" gap={2}>
                    <Copyable value={`https://${d.host}`}>
                      <Link isExternal href={`https://${d.host}`}>
                        {`https://${d.host}`} <ExternalLinkIcon mx="2px" />
                      </Link>
                    </Copyable>

                    <IconButton
                      aria-label="Delete"
                      colorScheme="red"
                      variant="outline"
                      icon={<DeleteIcon />}
                      onClick={() => removeSubdomain(d.host)}
                    />
                  </Flex>
                ))}
            </Box>

            <Flex direction="column" gap={2}>
              {customDomain !== null && (
                <FormControl isDisabled={isLoading} maxW="480px" minW="240px">
                  <FormLabel>Custom Domain</FormLabel>
                  <Input
                    maxLength={64}
                    placeholder="yourdomain.com"
                    isInvalid={customDomain.length > 0 && !validDomain}
                    value={customDomain}
                    onChange={(event) => setCustomDomain(event.target.value)}
                  />
                </FormControl>
              )}
              <ButtonGroup as={Box} size="sm" variant="outline">
                {customDomain === null && (
                  <Button
                    colorScheme="green"
                    leftIcon={<SmallAddIcon />}
                    onClick={() => setCustomDomain('')}
                  >
                    Add custom domain
                  </Button>
                )}
                {customDomain !== null && site.customDomain === null && (
                  <Button onClick={() => setCustomDomain(null)}>Cancel</Button>
                )}
              </ButtonGroup>
            </Flex>
          </Stack>
        </CardBody>

        <Divider color={footerBorder} />

        <CardFooter>
          <Flex width="100%" direction="row" justify="space-between" align="center">
            <Text fontSize="sm" color="gray">
              Use 64 characters maximum.
            </Text>

            <Stack direction="row">
              {hasChanged && (
                <Button
                  aria-label="Reset"
                  leftIcon={<RepeatIcon />}
                  onClick={() => setCustomDomain(site.customDomain ?? '')}
                >
                  Reset
                </Button>
              )}

              <Button
                colorScheme={validChanged ? 'green' : 'gray'}
                isDisabled={!validChanged || isLoading}
                isLoading={isLoading}
                leftIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save
              </Button>
            </Stack>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};

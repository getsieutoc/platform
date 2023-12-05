'use client';

import { useColorModeValue, useState } from '@/hooks';
import { updateProject } from '@/lib/actions/project';
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
  YellowFlashIcon,
  RepeatIcon,
  SaveIcon,
  SmallAddIcon,
} from '@/icons';
import { Service, Project } from '@/types';
import { updateDomains } from '@/lib/actions/easypanel';
import { Copyable } from '@/components/client';

type CustomDomainFormProps = {
  data: Project;
  service: Service;
};

export const CustomDomainForm = ({ data, service }: CustomDomainFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const cleanDomains = (service.domains ?? []).filter(
    (d) => !d.host.includes('easypanel.host')
  );

  const [customDomain, setCustomDomain] = useState(data.customDomain);

  const validDomain =
    customDomain !== null &&
    customDomain.length > 0 &&
    validDomainRegex.test(customDomain);

  const hasChanged =
    data.customDomain === null ? validDomain : customDomain !== data.customDomain;

  const validChanged = hasChanged && (validDomain || customDomain === '');

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  const handleSave = async () => {
    try {
      if (!validChanged) return;

      setIsLoading(true);

      const finalDomains =
        customDomain === ''
          ? (service.domains ?? []).filter((d) => d.host !== data.customDomain)
          : [
              {
                host: customDomain,
                https: true,
                path: '/',
                port: 80,
              },
              ...(service.domains ?? []),
            ];

      await updateProject(data.id, { customDomain });

      await updateDomains({
        id: data.id,
        domains: finalDomains,
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const generateSubdomain = async () => {
    await updateDomains({
      id: data.id,
      domains: [
        {
          host: `${data.slug}.sieutoc.website`,
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
      id: data.id,
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
                  variant="outline"
                  colorScheme="purple"
                  leftIcon={<YellowFlashIcon />}
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
              <ButtonGroup as={Box} variant="outline">
                {customDomain === null && (
                  <Button
                    colorScheme="brand"
                    leftIcon={<SmallAddIcon />}
                    onClick={() => setCustomDomain('')}
                  >
                    Add custom domain
                  </Button>
                )}
                {customDomain !== null && data.customDomain === null && (
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
                  onClick={() => setCustomDomain(data.customDomain ?? '')}
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

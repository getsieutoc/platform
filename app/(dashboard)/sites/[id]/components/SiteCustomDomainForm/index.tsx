'use client';

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
  Stack,
  Text,
} from '@/components/chakra';
import { RepeatIcon, SaveIcon } from '@/icons';
import { Site } from '@/types';

type SiteCustomDomainFormProps = {
  site: Site;
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

      await updateSiteSimple(site.id, { customDomain });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

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
                colorScheme={hasChanged && validDomain ? 'green' : 'gray'}
                isDisabled={!hasChanged || !validDomain || isLoading}
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

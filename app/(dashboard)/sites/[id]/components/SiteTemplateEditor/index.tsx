'use client';

import { useColorModeValue, useState } from '@/hooks';
import { updateSiteSimple } from '@/lib/actions/site';
import { validDomainRegex } from '@/lib/domains';
import { Fira_Mono } from 'next/font/google';

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
  Stack,
  Text,
  Textarea,
} from '@/components/chakra';
import { RepeatIcon, SaveIcon } from '@/icons';
import { Site } from '@/types';

export const fira_mono = Fira_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

type SiteTemplateEditorProps = {
  site: Site;
};

export const SiteTemplateEditor = ({ site }: SiteTemplateEditorProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState<string>('');
  const [customDomain, setCustomDomain] = useState(site?.customDomain ?? '');

  const validDomain = validDomainRegex.test(customDomain);

  const hasChanged = customDomain.length > 0 && customDomain !== site?.customDomain;

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  const codeBg = useColorModeValue('gray.100', 'gray.800');

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
          <Heading size="md">Template Editor</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6}>
            <FormControl isDisabled={isLoading} w="100%" minW="240px">
              <FormLabel>EasyPanel template</FormLabel>
              <Textarea
                className={fira_mono.className}
                spellcheck="false"
                bg={codeBg}
                rows={10}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
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

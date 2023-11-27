'use client';

import { useColorModeValue, useState, useClipboard } from '@/hooks';
import { updateSite } from '@/lib/actions/site';
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
  IconButton,
  Stack,
  Text,
  Textarea,
} from '@/components/chakra';
import { CheckCircleIcon, CopyIcon, RepeatIcon, SaveIcon } from '@/icons';
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

  const [inputValue, setInputValue] = useState<string>(site.template ?? '');

  const { onCopy, hasCopied } = useClipboard(inputValue);

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  const codeBg = useColorModeValue('gray.100', 'gray.800');

  const hasChanged = inputValue !== (site.template ?? '');

  const handleSave = async () => {
    try {
      if (!site || !inputValue) return;

      setIsLoading(true);

      await updateSite(site.id, { template: inputValue });
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
              <Flex position="relative">
                <Textarea
                  className={fira_mono.className}
                  spellCheck={false}
                  bg={codeBg}
                  rows={16}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

                <IconButton
                  icon={hasCopied ? <CheckCircleIcon color="green" /> : <CopyIcon />}
                  colorScheme={hasCopied ? 'green' : 'gray'}
                  variant="outline"
                  aria-label="Copy"
                  position="absolute"
                  zIndex={3}
                  right={2}
                  top={2}
                  onClick={onCopy}
                />
              </Flex>
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
                  onClick={() => setInputValue(site.template ?? '')}
                >
                  Reset
                </Button>
              )}

              <Button
                colorScheme={hasChanged ? 'green' : 'gray'}
                isDisabled={!hasChanged || isLoading}
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

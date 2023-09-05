'use client';

import { CheckCircleIcon, CopyIcon, ExternalLinkIcon } from '@/icons';
import { useClipboard, useColorModeValue } from '@/hooks';
import type { ReposResponse, Site } from '@/types';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Code,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';

export type SiteGithubInfoProps = {
  repo: ReposResponse['data'];
  site: Site;
};

// We will continue to work on this soon
export const SiteGitInfo = ({ repo, site }: SiteGithubInfoProps) => {
  const gitCloneText = `git clone ${repo.ssh_url}`;

  const { onCopy, hasCopied } = useClipboard(gitCloneText);

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  if (!repo) {
    return <Skeleton height="40px" />;
  }

  return (
    <>
      <Card direction="column" width="100%">
        <CardHeader>
          <Heading size="md">General Information</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6} minW="240px">
            <Stack direction="row" align="center">
              <Box>
                <Code padding={2} fontSize="xs">
                  {gitCloneText}
                </Code>
              </Box>
              <IconButton
                aria-label="Copy"
                icon={hasCopied ? <CheckCircleIcon color="green" /> : <CopyIcon />}
                size="sm"
                variant="outline"
                onClick={onCopy}
              />
            </Stack>

            <Stack direction="row" spacing={3}>
              <Button
                rightIcon={<ExternalLinkIcon />}
                colorScheme="purple"
                target="_blank"
                as={Link}
                href={repo.html_url}
                variant="outline"
                size="xs"
              >
                Go to GitHub repo
              </Button>

              <Button
                rightIcon={<ExternalLinkIcon />}
                colorScheme="black"
                target="_blank"
                as={Link}
                href={`https://vercel.com/sieutoc/${site.id}`}
                variant="outline"
                size="xs"
              >
                Go to Vercel project
              </Button>

              <Button
                rightIcon={<ExternalLinkIcon />}
                colorScheme="blue"
                target="_blank"
                as={Link}
                href={
                  site.customDomain
                    ? site.customDomain
                    : `https://${site.subdomain}.sieutoc.website`
                }
                variant="outline"
                size="xs"
              >
                Go to website
              </Button>
            </Stack>
          </Stack>
        </CardBody>

        <Divider color={footerBorder} />

        <CardFooter>
          <Flex width="100%" direction="row" justify="start" align="center">
            <Text fontSize="sm">For now we support only GitHub</Text>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};

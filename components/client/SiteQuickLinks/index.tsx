'use client';

import { CheckCircleIcon, CopyIcon, ExternalLinkIcon } from '@/icons';
import { useAuth, useClipboard, useColorModeValue } from '@/hooks';
import { UserRole, type ReposResponse, type Site } from '@/types';

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
} from '@/components/chakra';

export type SiteGithubInfoProps = {
  repo: ReposResponse['data'];
  site: Site;
};

// We will continue to work on this soon
export const SiteQuickLinks = ({ repo, site }: SiteGithubInfoProps) => {
  const gitCloneText = `git clone ${repo?.ssh_url}`;

  const { session } = useAuth();
  const { onCopy, hasCopied } = useClipboard(gitCloneText);

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  return (
    <>
      <Card direction="column" width="100%">
        <CardHeader>
          <Heading size="md">Quick Links</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6} minW="240px">
            <Stack direction="row" align="center">
              <Box>
                <Code padding={3} fontSize="xs" borderRadius="md">
                  {gitCloneText}
                </Code>
              </Box>
              <IconButton
                aria-label="Copy"
                colorScheme={hasCopied ? 'green' : 'gray'}
                icon={hasCopied ? <CheckCircleIcon color="green" /> : <CopyIcon />}
                variant="outline"
                onClick={onCopy}
              />
            </Stack>

            <Stack direction="row" spacing={3}>
              {repo && (
                <Button
                  rightIcon={<ExternalLinkIcon />}
                  colorScheme="purple"
                  target="_blank"
                  as={Link}
                  href={repo.html_url}
                  variant="outline"
                >
                  Go to GitHub repo
                </Button>
              )}

              {session?.user.role === UserRole.ADMIN && (
                <Button
                  rightIcon={<ExternalLinkIcon />}
                  colorScheme="green"
                  target="_blank"
                  as={Link}
                  href={`https://panel.sieutoc.website/projects/${site.id}`}
                  variant="outline"
                >
                  Go to EasyPanel project
                </Button>
              )}

              <Button
                rightIcon={<ExternalLinkIcon />}
                colorScheme="blue"
                target="_blank"
                as={Link}
                href={
                  site.customDomain
                    ? site.customDomain
                    : `https://${site.slug}.sieutoc.website`
                }
                variant="outline"
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

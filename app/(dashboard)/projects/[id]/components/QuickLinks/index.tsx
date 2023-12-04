'use client';

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
  Stack,
  Text,
} from '@/components/chakra';
import { CheckCircleIcon, CopyIcon, ExternalLinkIcon } from '@/icons';
import { UserRole, ReposResponse, Project } from '@/types';
import { useAuth, useClipboard, useColorModeValue } from '@/hooks';

export type QuickLinksProps = {
  repo: ReposResponse['data'];
  data: Project;
};

// We will continue to work on this soon
export const QuickLinks = ({ repo, data }: QuickLinksProps) => {
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
            {repo && (
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
            )}

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
                  href={`https://panel.sieutoc.website/projects/${data.id}`}
                  variant="outline"
                >
                  Go to EasyPanel project
                </Button>
              )}

              {data.customDomain && (
                <Button
                  as={Link}
                  target="_blank"
                  variant="outline"
                  colorScheme="blue"
                  rightIcon={<ExternalLinkIcon />}
                  href={`https://${data.customDomain}`}
                >
                  Go to website
                </Button>
              )}
            </Stack>
          </Stack>
        </CardBody>

        <Divider color={footerBorder} />

        <CardFooter>
          <Flex width="100%" direction="row" justify="start" align="center">
            <Text fontSize="sm" color="gray">
              For now we support only GitHub
            </Text>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};

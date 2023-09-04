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
  Link,
  Skeleton,
  Stack,
  Text,
} from '@/components';
import { useColorModeValue } from '@/hooks';
import type { ReposResponse } from '@/types';

import { ExternalLinkIcon } from '@/icons';

type SiteGithubInfoProps = {
  repo: ReposResponse['data'] | null;
};

// We will continue to work on this soon
export const SiteGithubInfo = ({ repo }: SiteGithubInfoProps) => {
  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  if (!repo) {
    return <Skeleton height="40px" />;
  }

  return (
    <>
      <Card direction="column" width="100%">
        <CardHeader>
          <Heading size="md">Git Info</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6} maxW="80%" minW="240px">
            <Box>
              <Code padding={2} fontSize="xs">
                git clone {repo.ssh_url}
              </Code>
            </Box>
          </Stack>
        </CardBody>

        <Divider color={footerBorder} />

        <CardFooter>
          <Flex width="100%" direction="row" justify="space-between" align="center">
            <Text fontSize="sm">For now we support only GitHub</Text>

            <Button
              rightIcon={<ExternalLinkIcon />}
              href={repo.html_url}
              colorScheme="blue"
              target="_blank"
              as={Link}
            >
              Go to GitHub repo
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};

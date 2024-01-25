'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from '@/components/chakra';
import { useChat, useColorModeValue, useProject } from '@/hooks';
import { Chatbox } from '@/components/client';
import { ExternalLinkIcon } from '@/icons';

export type QuickLinksProps = {
  baseUrl?: string;
};

// We will continue to work on this soon
export const QuickLinks = () => {
  const { project } = useProject();

  const { ...bindChat } = useChat();

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  return (
    <>
      <Card direction="column" width="100%">
        <CardHeader>
          <Heading size="md">Quick Links</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6} minW="240px">
            <Stack direction="row" spacing={3}>
              <Button
                href={`/projects/${project?.id}`}
                rightIcon={<ExternalLinkIcon />}
                colorScheme="green"
                variant="outline"
                target="_blank"
                as={Link}
              >
                Go to project
              </Button>

              {project && project.customDomain && (
                <Button
                  href={`https://${project.customDomain}`}
                  rightIcon={<ExternalLinkIcon />}
                  colorScheme="blue"
                  variant="outline"
                  target="_blank"
                  as={Link}
                >
                  Go to website
                </Button>
              )}

              <Chatbox {...bindChat} />
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

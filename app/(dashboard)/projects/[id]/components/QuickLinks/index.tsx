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
import { useAuth, useColorModeValue } from '@/hooks';
import { ExternalLinkIcon } from '@/icons';
import { Project } from '@/types';

export type QuickLinksProps = {
  data: Project;
  baseUrl?: string;
  easypanelUrl?: string;
};

// We will continue to work on this soon
export const QuickLinks = ({ data, easypanelUrl }: QuickLinksProps) => {
  const { isAdmin } = useAuth();

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
              {isAdmin && easypanelUrl && (
                <Button
                  rightIcon={<ExternalLinkIcon />}
                  colorScheme="green"
                  target="_blank"
                  as={Link}
                  href={`${easypanelUrl}/projects/${data.id}`}
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

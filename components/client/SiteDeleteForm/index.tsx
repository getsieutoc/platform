'use client';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  Skeleton,
  Stack,
  Text,
} from '@/components';
import { deleteSite } from '@/lib/actions/site';
import { useColorModeValue, useDisclosure, useRef, useRouter, useState } from '@/hooks';
import type { Site } from '@/types';

type SiteGeneralSettingsFormProps = {
  site: Site | null;
};
export const SiteDeleteForm = ({ site }: SiteGeneralSettingsFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const cancelRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [confirmName, setConfirmName] = useState('');

  const siteId = site?.id ?? '';

  const handleDelete = async () => {
    try {
      if (!site) return;

      setIsLoading(true);

      const res = await deleteSite(site);

      if (res) {
        router.push('/sites');
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const backgroundColor = useColorModeValue('red.50', 'red.800');
  const footerBorder = useColorModeValue('red.100', 'red.600');

  if (!siteId) {
    return <Skeleton height="40px" />;
  }

  return (
    <>
      <Card bg={backgroundColor} direction="column" width="100%">
        <CardHeader>
          <Heading size="md">Delete Site</Heading>
        </CardHeader>

        <CardBody>
          <Stack spacing={6} maxW="480px" minW="240px">
            <Text>
              The project will be permanently deleted, including its deployments and
              domains. This action is irreversible and can not be undone.
            </Text>
          </Stack>
        </CardBody>

        <Divider color={footerBorder} />

        <CardFooter>
          <Flex width="100%" direction="row" justify="end">
            <Button
              colorScheme="red"
              isDisabled={isLoading}
              isLoading={isLoading}
              onClick={onOpen}
            >
              Delete
            </Button>
          </Flex>
        </CardFooter>
      </Card>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Are you sure?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormControl>
              <FormLabel>
                Confirm by typing site name:{' '}
                <Text as="span" fontWeight="bold">
                  {site?.name}
                </Text>
              </FormLabel>
              <Input
                placeholder="Site name"
                value={confirmName ?? ''}
                onChange={(event) => setConfirmName(event.target.value)}
              />
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isDisabled={confirmName !== site?.name}
              colorScheme="red"
              ml={3}
              onClick={handleDelete}
            >
              Yes, delete it
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

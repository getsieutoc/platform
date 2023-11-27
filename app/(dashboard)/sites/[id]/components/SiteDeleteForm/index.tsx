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
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Skeleton,
  Stack,
  Text,
} from '@/components/chakra';
import {
  useColorModeValue,
  useDisclosure,
  useRef,
  useRouter,
  useState,
  useToast,
} from '@/hooks';
import { DeleteIcon } from '@/icons';
import { deleteProject } from '@/lib/actions/easypanel';
import { deleteRepo } from '@/lib/actions/github';
import { deleteSite } from '@/lib/actions/site';
import type { Site } from '@/types';

export type SiteDeleteFormProps = {
  site: Site;
};

export const SiteDeleteForm = ({ site }: SiteDeleteFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const cancelRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [confirmName, setConfirmName] = useState('');

  const siteId = site?.id ?? '';

  const handleCancel = () => {
    setConfirmName('');
    onClose();
  };

  const handleDelete = async () => {
    try {
      // if (!session || !session.user) {
      //   toast({ title: 'Authentication issue', status: 'error' });

      //   return;
      // }
      if (!site) return;

      setIsLoading(true);

      toast({ title: 'Start deleting...' });

      await deleteRepo(siteId);
      toast({ title: 'Deleted GitHub repo...' });

      await deleteProject({ name: site.id });

      const deletedSite = await deleteSite(site);

      toast({ title: 'Finally, deleted site!' });

      setIsLoading(false);

      onClose();

      if (deletedSite) {
        router.push('/sites');
      }
    } catch (error: any) {
      toast({ status: 'error', title: `Error: ${error.message}` });
    }
  };

  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const dangerColor = useColorModeValue('red.600', 'red.400');

  if (!siteId) {
    return <Skeleton height="40px" />;
  }

  return (
    <>
      <Card direction="column" width="100%">
        <CardHeader>
          <Heading size="md" color={dangerColor}>
            Delete Site
          </Heading>
        </CardHeader>

        <CardBody pt="0" borderBottomColor={borderColor} borderBottomWidth="1px">
          <Stack spacing={6} maxW="480px" minW="240px">
            <Text>
              The project will be permanently deleted, including its deployments, GitHub
              repo and domains. This action is irreversible and can not be undone.
            </Text>
          </Stack>
        </CardBody>

        <CardFooter>
          <Flex width="100%" direction="row" justify="end">
            <Button
              colorScheme="red"
              variant="outline"
              isDisabled={isLoading}
              isLoading={isLoading}
              leftIcon={<DeleteIcon />}
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
            <Stack direction="row" spacing={3}>
              <Button ref={cancelRef} isDisabled={isLoading} onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                isDisabled={confirmName !== site?.name || isLoading}
                colorScheme="red"
                onClick={handleDelete}
              >
                Yes, delete it
              </Button>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

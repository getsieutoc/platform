'use client';

import slugify from 'slugify';

import {
  Button,
  Code,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from '@/components/chakra';
import {
  useAuth,
  useDebounce,
  useDisclosure,
  useRef,
  useRouter,
  useState,
  useToast,
} from '@/hooks';
import { createProject } from '@/lib/actions/project';
import { AddIcon, EditIcon } from '@/icons';

const initialValues = {
  name: '',
  slug: '',
  description: '',
  template: '',
};

export type CreateNewButtonProps = {
  isDisabled?: boolean;
};

export const CreateNewButton = ({ isDisabled }: CreateNewButtonProps) => {
  const { session } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { addToast, updateToast } = useToast();

  const initialRef = useRef(null);

  const finalRef = useRef(null);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(initialValues);

  const [slugEditing, setSlugEditing] = useState(false);

  const isValid = !!data.template && !!data.name && !!data.slug;

  useDebounce(
    () => {
      setData((prev) => ({
        ...prev,
        slug: slugify(prev.name).toLowerCase(),
      }));
    },
    200,
    [data.name]
  );

  const handleCancel = () => {
    onClose();
    setData(initialValues);
    setSlugEditing(false);
  };

  const handleSubmit = async () => {
    try {
      if (!session || !session.user) {
        addToast({ title: 'Authentication issue', status: 'error' });

        return;
      }

      setIsLoading(true);

      addToast({ title: 'Creating your project...' });

      const newProject = await createProject(data);

      if (newProject) {
        updateToast({ title: 'Done!' });

        router.refresh();
        router.push(`/projects/${newProject.id}`);

        onClose();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      addToast({
        status: 'error',
        title: `Problem while creating project. ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        ref={finalRef}
        isDisabled={isDisabled}
        leftIcon={<AddIcon />}
        colorScheme="brand"
        onClick={onOpen}
      >
        Create New Project
      </Button>

      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Stack spacing={3}>
              <FormControl isRequired isDisabled={isLoading}>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Project name"
                  value={data.name}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, name: event.target.value }))
                  }
                />
                {!slugEditing && data.slug && (
                  <FormHelperText as={Flex} align="center" gap={2}>
                    <Text>Slug:</Text>
                    <Code paddingX={2} padding={1} fontSize="small" borderRadius="sm">
                      {data.slug}
                    </Code>
                    <IconButton
                      aria-label="Edit slug"
                      size="xs"
                      icon={<EditIcon />}
                      onClick={() => setSlugEditing(true)}
                    />
                  </FormHelperText>
                )}
              </FormControl>

              {slugEditing && (
                <FormControl isDisabled={isLoading}>
                  <FormLabel>Slug</FormLabel>
                  <Input
                    isDisabled={isLoading}
                    placeholder="slug"
                    value={data.slug}
                    onChange={(event) =>
                      setData((prev) => ({
                        ...prev,
                        slug: event.target.value.toLowerCase(),
                      }))
                    }
                  />
                </FormControl>
              )}

              <FormControl isDisabled={isLoading}>
                <FormLabel>Description (Optional)</FormLabel>
                <Textarea
                  rows={3}
                  placeholder="Optional but recommended"
                  value={data.description}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, description: event.target.value }))
                  }
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Stack direction="row" spacing={3}>
              <Button onClick={handleCancel}>Cancel</Button>

              <Button
                isDisabled={!isValid || isLoading}
                loadingText="Creating..."
                colorScheme="brand"
                isLoading={isLoading}
                leftIcon={<AddIcon />}
                onClick={handleSubmit}
              >
                Create Project
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

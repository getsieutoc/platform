'use client';

import slugify from 'slugify';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
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
import { addCollaborator, createRepo } from '@/lib/actions/github';
import { createSite } from '@/lib/actions/site';
import { UserRole } from '@prisma/client';
import { AddIcon } from '@/icons';

const initialValues = {
  name: '',
  slug: '',
  description: '',
  template: '',
};

export const CreateSiteButton = () => {
  const { session } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [template, setTemplate] = useState('taijutsu');

  const [data, setData] = useState(initialValues);

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
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const newSite = await createSite(data);

      if (newSite && session) {
        toast({ title: 'Creating your site...' });

        await createRepo({ ...newSite, template });
        toast({ title: 'GitHub repo is cloned successfully...' });

        toast({ title: 'adding you as collaborator...' });

        if (session.user.role !== UserRole.ADMIN) {
          await addCollaborator(newSite.id, session.user.username);
        }

        toast({ title: 'Done!' });

        onClose();

        router.refresh();
        router.push(`/sites/${newSite.id}`);
      }
    } catch (error: any) {
      toast({ status: 'error', title: error.message });
    }
  };

  return (
    <>
      <Button ref={finalRef} leftIcon={<AddIcon />} colorScheme="green" onClick={onOpen}>
        Create New Site
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Site</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Stack spacing={3}>
              <FormControl isDisabled={isLoading}>
                <FormLabel>Template</FormLabel>
                <Select
                  placeholder="Generate from template"
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                >
                  <option value="taijutsu">Taijutsu (TailwindCSS)</option>
                  <option value="ninjutsu">Ninjutsu (Chakra UI)</option>
                </Select>
              </FormControl>
              <FormControl isDisabled={isLoading}>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Site name"
                  value={data.name}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, name: event.target.value }))
                  }
                />
              </FormControl>

              <FormControl isDisabled={isLoading}>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Optional but recommended"
                  value={data.description}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, description: event.target.value }))
                  }
                />
              </FormControl>

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
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Stack direction="row" spacing={3}>
              <Button onClick={handleCancel}>Cancel</Button>

              <Button
                colorScheme="green"
                isDisabled={isLoading}
                isLoading={isLoading}
                loadingText="Creating..."
                onClick={handleSubmit}
              >
                Create Site
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

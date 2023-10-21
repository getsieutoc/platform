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
  Stack,
} from '@/components/chakra';
import {
  useAuth,
  useDisclosure,
  useEffect,
  useRef,
  useRouter,
  useState,
  useToast,
} from '@/hooks';
import { createDeployment, createProject } from '@/lib/actions/vercel';
import { addCollaborator, createRepo } from '@/lib/actions/github';
import { createSite } from '@/lib/actions/site';
import { AddIcon } from '@/icons';

import { SubdomainInput } from '../SubdomainInput';

const initialValues = {
  name: '',
  subdomain: '',
  description: '',
};

export const CreateSiteButton = () => {
  const { session } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(initialValues);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: slugify(prev.name).toLowerCase(),
    }));
  }, [data.name]);

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

        await createRepo(newSite);
        toast({ title: 'GitHub repo is cloned successfully...' });

        await createProject(newSite);

        toast({ title: 'adding you as collaborator...' });

        await addCollaborator(newSite.id, session.user.username);

        toast({ title: 'Done!' });

        await createDeployment({ id: newSite.id });

        // va.track('Created Site');
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

              <SubdomainInput
                isDisabled={isLoading}
                placeholder="Subdomain"
                value={data.subdomain}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    subdomain: event.target.value.toLowerCase(),
                  }))
                }
              />
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

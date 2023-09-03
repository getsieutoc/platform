'use client';

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
} from '@/components';
import { AddIcon } from '@/icons';
import { useDisclosure, useEffect, useRef, useRouter, useState, useToast } from '@/hooks';
import { createProject } from '@/lib/actions/vercel';
import { createRepo } from '@/lib/actions/github';
import { createSite } from '@/lib/actions/site';
import type { ToastId } from '@/types';

const initialValues = {
  name: '',
  subdomain: '',
  description: '',
};

export const CreateSiteButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toastIdRef = useRef<ToastId>();
  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(initialValues);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, '-'),
    }));
  }, [data.name]);

  const handleCancel = () => {
    onClose();
    setData(initialValues);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await createSite(data);

      if (response) {
        toastIdRef.current = toast({ title: 'Creating your site...' });

        await createRepo(response);
        toast.update(toastIdRef?.current, {
          title: 'GitHub repo is cloned successfully, and...',
        });

        await createProject(response);
        toast.update(toastIdRef?.current, { title: 'Done!' });

        // va.track('Created Site');
        onClose();

        router.refresh();
        router.push(`/sites/${response.id}`);
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
                  placeholder="Site description"
                  value={data.description}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, description: event.target.value }))
                  }
                />
              </FormControl>

              <FormControl isDisabled={isLoading}>
                <FormLabel>Subdomain</FormLabel>
                <Input
                  placeholder="Subdomain"
                  value={data.subdomain}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, subdomain: event.target.value }))
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

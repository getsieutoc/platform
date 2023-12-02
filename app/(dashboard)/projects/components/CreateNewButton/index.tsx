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
import { createEasyPanelProject } from '@/lib/actions/easypanel';
import { createProject } from '@/lib/actions/project';
import { UserRole } from '@prisma/client';
import { templates } from '@/templates';
import { AddIcon } from '@/icons';
import { isEqual } from '@/lib/utils';

const initialValues = {
  name: '',
  slug: '',
  description: '',
  template: '',
};

export const CreateNewButton = () => {
  const { session } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(initialValues);

  const isValid = data.template && !isEqual(data, initialValues);

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
      if (!session || !session.user) {
        toast({ title: 'Authentication issue', status: 'error' });

        return;
      }

      setIsLoading(true);

      const newProject = await createProject(data);

      if (newProject) {
        toast({ title: 'Creating your project...' });

        if (data.template === 'taijutsu') {
          await createRepo(newProject);
          toast({ title: '...GitHub repo is cloned successfully' });

          if (session.user.role !== UserRole.ADMIN) {
            toast({ title: '...adding you as collaborator' });
            await addCollaborator(newProject.id, session.user.username);
          }
        }

        toast({ title: '...creating services on EasyPanel' });
        await createEasyPanelProject(newProject);

        toast({ title: 'Done!' });

        onClose();

        router.refresh();
        router.push(`/projects/${newProject.id}`);
      }
    } catch (error: any) {
      toast({ status: 'error', title: error.message });
    }
  };

  return (
    <>
      <Button ref={finalRef} leftIcon={<AddIcon />} colorScheme="green" onClick={onOpen}>
        Create New Project
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Stack spacing={3}>
              <FormControl isDisabled={isLoading}>
                <FormLabel>Template</FormLabel>
                <Select
                  placeholder="Generate from template"
                  value={data.template}
                  onChange={(e) => setData({ ...data, template: e.target.value })}
                >
                  {templates.map(({ slug, title }) => (
                    <option key={slug} value={slug}>
                      {title}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isDisabled={isLoading}>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Project name"
                  value={data.name}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, name: event.target.value }))
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
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Stack direction="row" spacing={3}>
              <Button onClick={handleCancel}>Cancel</Button>

              <Button
                colorScheme={isValid ? 'green' : 'gray'}
                loadingText="Creating..."
                isLoading={isLoading}
                isDisabled={!isValid || isLoading}
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

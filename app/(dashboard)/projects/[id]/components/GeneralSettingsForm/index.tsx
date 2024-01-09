'use client';

import {
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
  InputGroup,
  InputRightElement,
  Skeleton,
  Stack,
  Text,
  Textarea,
} from '@/components/chakra';
import {
  useColorModeValue,
  useEffect,
  useMemo,
  useParams,
  useState,
  useSWR,
} from '@/hooks';
import { updateProject } from '@/lib/actions/project';
import { RepeatIcon, SaveIcon } from '@/icons';
import { Plan, Project } from '@/types';
import { isEqual } from '@/lib/utils';

type GeneralFormValues = Pick<Project, 'name' | 'slug' | 'description'>;

const initialValues: GeneralFormValues = {
  name: '',
  slug: '',
  description: '',
};

export const GeneralSettingsForm = () => {
  const params = useParams<{ id: string }>();

  const { data: project, mutate } = useSWR<Project>(`/api/projects/${params.id}`);

  const projectValues = useMemo(
    () => ({
      name: project?.name ?? '',
      slug: project?.slug ?? '',
      description: project?.description ?? '',
    }),
    [project]
  );

  const [isSaving, setIsSaving] = useState(false);

  const [formValues, setFormValues] = useState<GeneralFormValues>(initialValues);

  useEffect(() => {
    if (project && isEqual(formValues, initialValues)) {
      const { name, slug, description } = projectValues;

      setFormValues({ name, slug, description });
    }
  }, [project, formValues, projectValues]);

  const handleSave = async () => {
    if (!project || !formValues) return;

    setIsSaving(true);

    const res = await updateProject(project.id, formValues);

    if (res) {
      mutate();
    }

    setIsSaving(false);
  };

  const hasChanged = !isEqual(formValues, projectValues);

  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

  if (!project) {
    return <Skeleton h="100px" />;
  }

  return (
    <Card direction="column" width="100%">
      <CardHeader>
        <Heading size="md">General Settings</Heading>
      </CardHeader>
      <CardBody pt="0" borderBottomColor={borderColor} borderBottomWidth="1px">
        <Stack spacing={6} maxW="480px" minW="240px">
          <FormControl isDisabled={isSaving}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Project name"
              value={formValues?.name ?? ''}
              onChange={(event) =>
                setFormValues(() => ({ ...formValues, name: event.target.value }))
              }
            />
          </FormControl>

          <FormControl isDisabled={isSaving}>
            <FormLabel>Slug</FormLabel>
            <InputGroup>
              <Input
                pr="8rem"
                placeholder="Slug"
                isDisabled={project.plan === Plan.HOBBY}
                value={formValues?.slug ?? ''}
                onChange={(event) =>
                  setFormValues(() => ({ ...formValues, slug: event.target.value }))
                }
              />
              {project.plan === Plan.HOBBY && (
                <InputRightElement width="7.5rem" pr="0.35rem">
                  <Button isDisabled h="1.75rem" size="sm">
                    Edit (Soon)
                  </Button>
                </InputRightElement>
              )}
            </InputGroup>
          </FormControl>

          <FormControl isDisabled={isSaving}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Project description"
              rows={3}
              value={formValues?.description ?? ''}
              onChange={(event) =>
                setFormValues(() => ({ ...formValues, description: event.target.value }))
              }
            />
          </FormControl>
        </Stack>
      </CardBody>

      <CardFooter>
        <Flex width="100%" direction="row" justify="space-between" align="center">
          <Text fontSize="sm" color="gray">
            The info here only used for management, the real data might be different.
          </Text>

          <Stack direction="row">
            {hasChanged && (
              <Button
                aria-label="Reset"
                leftIcon={<RepeatIcon />}
                onClick={() => setFormValues(initialValues)}
              >
                Reset
              </Button>
            )}
            <Button
              isDisabled={!hasChanged || isSaving}
              leftIcon={<SaveIcon />}
              isLoading={isSaving}
              onClick={handleSave}
              colorScheme="brand"
              loadingText="Save"
            >
              Save
            </Button>
          </Stack>
        </Flex>
      </CardFooter>
    </Card>
  );
};

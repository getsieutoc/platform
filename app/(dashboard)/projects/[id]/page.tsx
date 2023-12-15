import { getProject } from '@/lib/actions/project';
import { Stack } from '@/components/chakra';

import {
  CustomDomainForm,
  DeleteForm,
  GeneralSettingsForm,
  QuickLinks,
} from './components';

export type SingleProjectPageProps = {
  params: {
    id: string;
  };
};

export default async function SingleProjectPage({ params }: SingleProjectPageProps) {
  const project = await getProject(params.id);

  if (!project) {
    return null;
  }

  return (
    <Stack width="100%" spacing={6}>
      {project && <QuickLinks data={project} />}

      {project && <GeneralSettingsForm data={project} />}

      {project && <CustomDomainForm data={project} />}

      {project && <DeleteForm data={project} />}
    </Stack>
  );
}

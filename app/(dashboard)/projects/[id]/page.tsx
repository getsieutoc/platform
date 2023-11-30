import { checkRepoExisting } from '@/lib/actions/github';
import { getProject } from '@/lib/actions/easypanel';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import { Stack } from '@/components/chakra';
import { UserRole } from '@prisma/client';

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
  const session = await getSession();

  if (!session) {
    return null;
  }

  const id = decodeURIComponent(params.id);

  const repo = await checkRepoExisting(id);

  const projectRes = await getProject({ projectName: id });
  const nextjsService = projectRes.result.data.json.services.find(
    // @ts-expect-error service.name is wrong typed
    (o) => o.name === 'nextjs'
  );

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (session.user.role !== UserRole.ADMIN && project?.userId !== session.user.id) {
    redirect('/projects');
  }

  return (
    <Stack width="100%" spacing={6}>
      {project && <QuickLinks repo={repo} data={project} />}

      {project && <GeneralSettingsForm data={project} />}

      {project && nextjsService && (
        <CustomDomainForm data={project} service={nextjsService} />
      )}

      {project && <DeleteForm data={project} />}
    </Stack>
  );
}

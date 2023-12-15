import { getEasyPanelProject } from '@/lib/actions/easypanel';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
  const { session, isAdmin } = await getSession();

  const projectRes = await getEasyPanelProject({ projectName: params.id });
  const nextjsService = projectRes.result.data.json.services.find(
    // @ts-expect-error service.name is wrong typed
    (o) => o.name === 'nextjs'
  );

  const project = await prisma.project.findUnique({
    include: { users: true },
    where: {
      id: params.id,
      users: isAdmin ? {} : { some: { id: session.user.id } },
    },
  });

  return (
    <Stack width="100%" spacing={6}>
      {project && <QuickLinks data={project} />}

      {project && <GeneralSettingsForm data={project} />}

      {project && nextjsService && (
        <CustomDomainForm data={project} service={nextjsService} />
      )}

      {project && <DeleteForm data={project} />}
    </Stack>
  );
}

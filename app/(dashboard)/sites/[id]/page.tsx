import { checkRepoExisting } from '@/lib/actions/github';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import { Stack } from '@/components/chakra';
import { UserRole } from '@prisma/client';
import {
  SiteCustomDomainForm,
  SiteDeleteForm,
  SiteGeneralSettingsForm,
  SiteQuickLinks,
} from './components';
// import { getProject } from '@/lib/actions/easypanel';

export type SingleSitePageProps = {
  params: {
    id: string;
  };
};

export default async function SingleSitePage({ params }: SingleSitePageProps) {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const id = decodeURIComponent(params.id);

  const repo = await checkRepoExisting(id);

  // const project = await getProject({ projectName: id });

  const site = await prisma.site.findUnique({
    where: { id },
  });

  if (session.user.role !== UserRole.ADMIN && site?.userId !== session.user.id) {
    redirect('/sites');
  }

  return (
    <Stack width="100%" spacing={6}>
      {site && <SiteQuickLinks repo={repo} site={site} />}

      {site && <SiteGeneralSettingsForm site={site} />}

      {site && <SiteCustomDomainForm site={site} />}

      {site && <SiteDeleteForm site={site} />}
    </Stack>
  );
}

import {
  SiteDeleteForm,
  SiteGeneralSettingsForm,
  SiteGitInfo,
} from '@/components/client';
import { Stack } from '@/components/chakra';

import { checkRepoExisting } from '@/lib/actions/github';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

type SiteSettingsProps = {
  params: {
    id: string;
  };
};

export default async function SiteSettingsIndex({ params }: SiteSettingsProps) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const repo = await checkRepoExisting(params.id);

  const site = await prisma.site.findUnique({
    where: { id: params.id },
  });

  if (session.user.role !== UserRole.ADMIN && site?.userId !== session.user.id) {
    redirect('/sites');
  }

  return (
    <Stack width="100%" spacing={6}>
      {repo && site && <SiteGitInfo repo={repo} site={site} />}

      {site && <SiteGeneralSettingsForm site={site} />}

      {site && <SiteDeleteForm site={site} />}
    </Stack>
  );
}

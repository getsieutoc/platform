import { Stack } from '@chakra-ui/react';
import {
  SiteDeleteForm,
  SiteGeneralSettingsForm,
  SiteGitInfo,
} from '@/components/client';
import { checkRepoExisting } from '@/lib/actions/github';
import { prisma } from '@/lib/prisma';

type SiteSettingsProps = {
  params: {
    id: string;
  };
};

export default async function SiteSettingsIndex({ params }: SiteSettingsProps) {
  const repo = await checkRepoExisting(params.id);

  const site = await prisma.site.findUnique({
    where: { id: params.id },
  });

  return (
    <Stack width="100%" spacing={6}>
      {repo && site && <SiteGitInfo repo={repo} site={site} />}

      {site && <SiteGeneralSettingsForm site={site} />}

      {site && <SiteDeleteForm site={site} />}
    </Stack>
  );
}

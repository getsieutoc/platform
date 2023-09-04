import {
  SiteDeleteForm,
  SiteGeneralSettingsForm,
  SiteGithubInfo,
} from '@/components/client';
import { checkRepoExisting } from '@/lib/actions/github';
import { Stack } from '@/components';
import { prisma } from '@/lib/prisma';

type SiteSettingsProps = {
  params: {
    id: string;
  };
};

export default async function SiteSettingsIndex({ params }: SiteSettingsProps) {
  const existingRepo = await checkRepoExisting(params.id);

  const site = await prisma.site.findUnique({
    where: { id: params.id },
  });

  return (
    <Stack width="100%" spacing={6}>
      <SiteGithubInfo repo={existingRepo} />

      <SiteGeneralSettingsForm site={site} />

      <SiteDeleteForm site={site} />
    </Stack>
  );
}

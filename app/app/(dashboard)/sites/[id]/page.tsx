import { SiteDeleteForm, SiteGeneralSettingsForm } from '@/components/client';
import { checkRepoExisting } from '@/lib/actions/repo';
import { Spinner, Stack } from '@/components';
import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';

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
      <Suspense fallback={<Spinner />}>
        {existingRepo && <div>{existingRepo.data.git_url}</div>}
      </Suspense>

      <SiteGeneralSettingsForm site={site} />

      <SiteDeleteForm site={site} />
    </Stack>
  );
}

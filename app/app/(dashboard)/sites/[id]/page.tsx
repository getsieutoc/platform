import { SiteGeneralSettingsForm } from '@/components/client';
import { checkRepoExisting } from '@/lib/actions/repo';
import { Flex, Spinner } from '@/components';
import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';

type SiteSettingsProps = {
  params: {
    id: string;
  };
};

export default async function SiteSettingsIndex({ params }: SiteSettingsProps) {
  const existingRepo = await checkRepoExisting(params.id);
  console.log('### existingRepo: ', { existingRepo });

  const site = await prisma.site.findUnique({
    where: { id: params.id },
  });

  return (
    <Flex width="100%">
      <Suspense fallback={<Spinner />}>
        {existingRepo ? <div>{existingRepo.data.git_url}</div> : <p>no repo</p>}
      </Suspense>

      <SiteGeneralSettingsForm site={site} />
    </Flex>
  );
}

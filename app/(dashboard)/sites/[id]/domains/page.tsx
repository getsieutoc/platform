import { Stack } from '@/components/chakra';

import { SiteCustomDomainForm, SiteSubdomainForm } from '@/components/client';
import { prisma } from '@/lib/prisma';

export default async function SiteSettingsDomains({
  params,
}: {
  params: { id: string };
}) {
  const site = await prisma.site.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <Stack width="100%" spacing={6}>
      <SiteSubdomainForm site={site} />
      <SiteCustomDomainForm site={site} />
    </Stack>
  );
}

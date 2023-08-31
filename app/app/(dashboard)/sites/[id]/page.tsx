import { prisma } from '@/lib/prisma';
import { updateSite } from '@/lib/actions';
import { Flex, FormControl, FormLabel, Input, Skeleton, Stack } from '@/components';
import { SiteGeneralSettingsForm } from '@/components/client';

type SiteSettingsProps = {
  params: {
    id: string;
  };
};

export default async function SiteSettingsIndex({ params }: SiteSettingsProps) {
  const site = await prisma.site.findUnique({
    where: { id: params.id },
  });

  return (
    <Flex width="100%">
      <SiteGeneralSettingsForm site={site} />
    </Flex>
  );
}

import { Box } from '@chakra-ui/react';
import { prisma } from '@/lib/prisma';

export default async function SiteSettingsAppearance({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.site.findUnique({
    where: {
      id: params.id,
    },
  });

  return <Box>TODO: {data?.name}</Box>;
}

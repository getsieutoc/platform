import { ReactNode, Suspense } from 'react';

import { Box, Flex, Skeleton, Spinner } from '@/components/chakra';
import { getSession } from '@/lib/auth';

import { Navbar, Profile } from './components';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) {
    return <Spinner />;
  }

  return (
    <Flex>
      <Navbar session={session}>
        <Suspense fallback={<Skeleton height="24px" />}>
          <Profile />
        </Suspense>
      </Navbar>

      <Box padding={6} width="100%" height="100vh" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
}

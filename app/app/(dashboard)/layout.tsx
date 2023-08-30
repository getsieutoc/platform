import { ReactNode, Suspense } from 'react';
import { Box, Flex, Skeleton, Navbar } from '@/components';
import { Profile } from '@/components/server';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Flex>
      <Navbar>
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

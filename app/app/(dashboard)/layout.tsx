import { ReactNode, Suspense } from 'react';
import { Box, Flex, Skeleton, Navbar } from '@/components';
import { Profile } from '@/components/server';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Flex>
      <Navbar>
        <Suspense fallback={<Skeleton height="20px" />}>
          <Profile />
        </Suspense>
      </Navbar>

      <Box>{children}</Box>
    </Flex>
  );
}

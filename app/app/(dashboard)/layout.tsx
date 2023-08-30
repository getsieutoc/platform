import { ReactNode, Suspense } from 'react';
import Profile from '@/components/profile';
import Nav from '@/components/nav';
import { Box, Flex, Skeleton } from '@/components';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Flex>
      <Nav>
        <Suspense fallback={<Skeleton height="20px" />}>
          <Profile />
        </Suspense>
      </Nav>

      <Box>{children}</Box>
    </Flex>
  );
}

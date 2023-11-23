import { Box } from '@/components/chakra';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Login | Sieutoc Platform',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <Box>{children}</Box>;
}

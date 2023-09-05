import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Login | Website Sieutoc',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <Box>{children}</Box>;
}

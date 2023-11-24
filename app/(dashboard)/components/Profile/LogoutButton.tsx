'use client';

import { IconButton } from '@/components/chakra';
import { signOut } from 'next-auth/react';

import { LogoutIcon } from '@/icons';

export const LogoutButton = () => {
  return (
    <IconButton
      aria-label="Logout"
      size="sm"
      variant="outline"
      icon={<LogoutIcon />}
      onClick={() => signOut()}
    />
  );
};

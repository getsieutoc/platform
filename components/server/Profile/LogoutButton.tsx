'use client';

import { signOut } from 'next-auth/react';
import { LogoutIcon } from '@/icons';
import { IconButton } from '@/components';

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

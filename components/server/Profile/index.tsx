import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

import { Avatar, NextLink, Stack, Text } from '@/components';

import { LogoutButton } from './LogoutButton';

export const Profile = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
  }

  const { name, image, email } = session.user;

  return (
    <div className="flex w-full items-center justify-between">
      <NextLink href="/profile">
        <Stack direction="row">
          <Avatar
            size="xs"
            name={name ?? 'User avatar'}
            src={image ?? `https://avatar.vercel.sh/${email}`}
          />

          <Text>{name ?? 'Unnamed'}</Text>
        </Stack>
      </NextLink>

      <LogoutButton />
    </div>
  );
};

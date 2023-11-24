import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

import { Avatar, Flex, Stack, Text } from '@/components/chakra';
import { NextLink } from '@/components/client';

import { LogoutButton } from './LogoutButton';

export const Profile = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
  }

  const { name, image, email } = session.user;

  const displayName = name ?? email ?? '';

  return (
    <Flex direction="row" align="center" justify="space-between">
      <NextLink href="/profile">
        <Stack direction="row">
          <Avatar size="xs" name={displayName} src={image ?? ''} />

          <Text>{displayName}</Text>
        </Stack>
      </NextLink>

      <LogoutButton />
    </Flex>
  );
};

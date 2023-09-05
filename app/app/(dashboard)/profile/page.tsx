import { Flex, Heading } from '@chakra-ui/react';
import { redirect } from 'next/navigation';

// import { editUser } from '@/lib/actions/site';
import { getSession } from '@/lib/auth';

export default async function ProfileSettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }
  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex height="48px" align="center">
        <Heading as="h1" size="lg">
          Profile Settings
        </Heading>
      </Flex>
    </Flex>
  );
}

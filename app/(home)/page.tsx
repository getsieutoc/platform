import { Button, Heading } from '@/components/chakra';
import { NextLink } from '@/components/client';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getSession();

  if (session) {
    redirect('/projects');
  }

  return (
    <>
      <Heading>Edit this page on app/home/page.tsx</Heading>

      <Button as={NextLink} href="/login">
        Start creating
      </Button>
    </>
  );
}

import { Divider, Heading, Stack } from '@/components/chakra';
import { ColorModeSwitcher, Logo } from '@/components/client';
import { newURLWithSearchParams } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { cookies } from 'next/headers';

import { LoginByEmail, LoginByGithub } from './components';

const hasGithubProvider = !!process.env.GITHUB_ID && !!process.env.GITHUB_SECRET;
const hasEmailProvider = !!process.env.SMTP_USER && !!process.env.SMTP_PASSWORD;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  const { session } = await getSession();

  if (session) {
    redirect(newURLWithSearchParams('/projects', searchParams));
  }

  const cookieStore = cookies();
  const requestCookie = cookieStore.get('verificationRequest');
  const isRequested = !!requestCookie && requestCookie.value === 'true';

  return (
    <Stack
      gap={4}
      maxWidth="sm"
      marginX="auto"
      marginTop="10vh"
      align="center"
      justify="center"
    >
      <Logo href="/" />

      <Heading as="h1" size="lg">
        Login
      </Heading>

      {hasEmailProvider && (
        <>
          <Divider />
          <LoginByEmail isRequested={isRequested} />
        </>
      )}

      {hasGithubProvider && (
        <>
          <Divider />
          <LoginByGithub org={process.env.GITHUB_ORG} />
        </>
      )}

      <ColorModeSwitcher />
    </Stack>
  );
}

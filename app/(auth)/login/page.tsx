import { Flex, Heading, Stack, Text } from '@/components/chakra';
import { ColorModeSwitcher, Logo, NextLink } from '@/components/client';
import { newURLWithSearchParams } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { cookies } from 'next/headers';

import { LoginByEmail } from './login-by-email';
import { LoginByGithub } from './login-by-github';

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
    <Flex
      justify="space-evenly"
      direction="column"
      marginX="auto"
      align="center"
      maxWidth="sm"
      h="70%"
    >
      <Stack w="100%" align="center">
        <Logo href="/" />

        <Heading as="h1" size="lg">
          Login
        </Heading>
      </Stack>

      {hasEmailProvider && <LoginByEmail isRequested={isRequested} />}

      {hasGithubProvider && <LoginByGithub org={process.env.GITHUB_ORG} />}

      <Stack w="100%" align="center" gap={4}>
        <Text fontSize="xs" textAlign="center">
          By continue using service, you agree to our{' '}
          <NextLink href="/terms">Terms</NextLink>
        </Text>

        <ColorModeSwitcher />
      </Stack>
    </Flex>
  );
}

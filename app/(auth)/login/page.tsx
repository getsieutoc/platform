import { Divider, Heading, Stack, Text } from '@/components/chakra';
import { Logo } from '@/components/client';

import { LoginByEmail, LoginByGithub } from './components';

const hasGithubProvider = !!process.env.GITHUB_ID && !!process.env.GITHUB_SECRET;
const hasEmailProvider = !!process.env.EMAIL_SERVER && !!process.env.EMAIL_FROM;

export default function LoginPage() {
  return (
    <Stack gap={4} maxWidth="sm" marginX="auto" marginTop="10vh">
      <Logo width={256} height={74} />

      <Heading as="h1" size="lg">
        Login
      </Heading>

      <Divider />

      {hasGithubProvider && <LoginByGithub org={process.env.GITHUB_ORG} />}

      {hasEmailProvider && <LoginByEmail />}
    </Stack>
  );
}

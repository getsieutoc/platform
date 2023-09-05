import { Divider, Heading, Stack } from '@chakra-ui/react';

import LoginButton from './login-button';

export default function LoginPage() {
  return (
    <Stack gap={4} maxWidth="sm" marginX="auto" marginTop="10vh">
      <Heading as="h1" size="lg">
        Login
      </Heading>

      <Divider />

      <LoginButton />
    </Stack>
  );
}

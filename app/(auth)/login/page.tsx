import { Divider, Heading, Stack, Text } from '@/components/chakra';
import { Logo } from '@/components/client';

import LoginButton from './login-button';

export default function LoginPage() {
  return (
    <Stack gap={4} maxWidth="sm" marginX="auto" marginTop="10vh">
      <Logo width={256} height={74} />

      <Heading as="h1" size="lg">
        Login
      </Heading>

      <Divider />

      <LoginButton />

      <Text fontSize="small" color="gray">
        Only for members of @websitesieutoc at this time.
      </Text>
    </Stack>
  );
}

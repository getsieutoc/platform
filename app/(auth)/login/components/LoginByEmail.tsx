'use client';

import {
  useEffect,
  useKeyPressEvent,
  useSearchParams,
  useState,
  useToast,
} from '@/hooks';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Input,
  Stack,
} from '@/components/chakra';
import { signIn } from 'next-auth/react';
import { FlashIcon } from '@/icons';

export type LoginByEmailProps = {
  isRequested: boolean;
};

export const LoginByEmail = ({ isRequested }: LoginByEmailProps) => {
  const toast = useToast();
  const [isFocused, setFocused] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  const [email, setEmail] = useState('');

  const handleSignIn = async () => {
    const callbackUrl = searchParams?.get('callbackUrl') ?? '/';

    setLoading(true);

    await signIn('email', {
      email,
      callbackUrl,
    });
  };

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast({ description: errorMessage, status: 'error' });
  }, [error, toast]);

  useKeyPressEvent('Enter', (e) => {
    if (isFocused && email && !isLoading) {
      e.preventDefault();
      handleSignIn();
    }
  });

  return (
    <Stack gap={4}>
      {isRequested && (
        <Alert status="success" variant="subtle" borderRadius="md" pb={4}>
          <AlertIcon boxSize="20px" />
          <Box>
            <AlertTitle mt={2}>Check your email!</AlertTitle>
            <AlertDescription fontSize="sm">
              We sent an email to you with a magic link that will sign you in. You can
              close this window.
            </AlertDescription>
          </Box>
        </Alert>
      )}

      <Input
        size="lg"
        value={email}
        borderWidth="2px"
        focusBorderColor="brand.500"
        placeholder="email@example.com"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        size="lg"
        colorScheme="brand"
        isLoading={isLoading}
        isDisabled={isLoading || !email}
        leftIcon={<FlashIcon />}
        onClick={handleSignIn}
      >
        Login with Email
      </Button>
    </Stack>
  );
};

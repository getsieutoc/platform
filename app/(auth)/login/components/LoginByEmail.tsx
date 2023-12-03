'use client';

import {
  useEffect,
  useKeyPressEvent,
  useSearchParams,
  useState,
  useToast,
} from '@/hooks';
import { Button, Input, Stack } from '@/components/chakra';
import { signIn } from 'next-auth/react';
import { FlashIcon } from '@/icons';

export const LoginByEmail = () => {
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

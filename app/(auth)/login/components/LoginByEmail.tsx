'use client';

import { useState, useEffect, useSearchParams, useToast } from '@/hooks';
import { Button, Input, Stack } from '@/components/chakra';
import { signIn } from 'next-auth/react';
import { FlashIcon } from '@/icons';

export const LoginByEmail = () => {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  const [email, setEmail] = useState('');

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast({ description: errorMessage, status: 'error' });
  }, [error, toast]);

  const getCallbackUrl = () => {
    const callbackUrl = searchParams?.get('callbackUrl');

    if (typeof callbackUrl === 'string') {
      return callbackUrl;
    }

    return '/';
  };

  return (
    <Stack gap={4}>
      <Input
        size="lg"
        borderWidth="2px"
        focusBorderColor="brand.500"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        size="lg"
        colorScheme="brand"
        isLoading={isLoading}
        isDisabled={isLoading}
        leftIcon={<FlashIcon />}
        onClick={() => {
          setLoading(true);
          signIn('email', {
            email,
            callbackUrl: getCallbackUrl(),
          });
        }}
      >
        Login with Email
      </Button>
    </Stack>
  );
};

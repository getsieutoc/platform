'use client';

import { useState, useEffect, useSearchParams, useToast } from '@/hooks';
import { Button } from '@/components/chakra';
import { signIn } from 'next-auth/react';
import { GithubIcon } from '@/icons';

export default function LoginButton() {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

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
    <Button
      isDisabled={isLoading}
      isLoading={isLoading}
      leftIcon={<GithubIcon />}
      size="lg"
      loadingText="Login with GitHub"
      onClick={() => {
        setLoading(true);
        signIn('github', {
          redirect: true,
          callbackUrl: getCallbackUrl(),
        });
      }}
    >
      Login with GitHub
    </Button>
  );
}

'use client';

import { Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import { useState, useEffect, useSearchParams } from '@/hooks';
import { GithubIcon } from '@/icons';

export default function LoginButton() {
  const [isLoading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast.error(errorMessage);
  }, [error]);

  return (
    <Button
      isDisabled={isLoading}
      isLoading={isLoading}
      leftIcon={<GithubIcon />}
      size="lg"
      loadingText="Login with GitHub"
      onClick={() => {
        setLoading(true);
        signIn('github');
      }}
    >
      Login with GitHub
    </Button>
  );
}

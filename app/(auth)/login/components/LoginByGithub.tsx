'use client';

import { useState, useEffect, useSearchParams, useToast, usePostHog } from '@/hooks';
import { Button, Stack, Text } from '@/components/chakra';
import { signIn } from 'next-auth/react';
import { GithubIcon } from '@/icons';

export type LoginByGithubProps = {
  org?: string;
};

export const LoginByGithub = ({ org }: LoginByGithubProps) => {
  const { toast } = useToast();
  const [isLoading, setLoading] = useState(false);

  const posthog = usePostHog();

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  const callbackUrl = searchParams.get('callbackUrl') ?? '/projects';

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast({ description: errorMessage, status: 'error' });
  }, [error, toast]);

  const handleLogin = async () => {
    posthog?.capture('click_login_github');

    const params = new URLSearchParams(searchParams);

    params.delete('callbackUrl');

    params.append('signedIn', 'true');

    setLoading(true);

    await signIn('github', {
      redirect: true,
      callbackUrl: `${callbackUrl}?${params}`,
    });

    setLoading(false);
  };

  return (
    <Stack gap={1} textAlign="center" w="100%">
      <Button
        size="lg"
        colorScheme="brand"
        isLoading={isLoading}
        isDisabled={isLoading}
        leftIcon={<GithubIcon />}
        loadingText="Login with GitHub"
        onClick={handleLogin}
      >
        Login with GitHub
      </Button>

      {org && (
        <Text fontSize="small" color="gray">
          Only for members of @{org} at this time.
        </Text>
      )}
    </Stack>
  );
};

import { IS_PRODUCTION, NEXT_PUBLIC_ROOT_DOMAIN } from '@/lib/constants';
import { Button, Heading } from '@/components/chakra';
import { NextLink } from '@/components/client';

export default function HomePage() {
  const url = `${IS_PRODUCTION ? 'https' : 'http'}://app.${NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <Heading>Edit this page on app/home/page.tsx</Heading>

      <Button as={NextLink} href={url}>
        Start creating
      </Button>
    </>
  );
}

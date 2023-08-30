import { Button, Heading, NextLink } from '@/components';

export default function HomePage() {
  return (
    <>
      <Heading>Edit this page on app/home/page.tsx</Heading>

      <Button as={NextLink} href="http://app.localhost:3000">
        Start creating
      </Button>
    </>
  );
}

import { Button, NextLink } from '@/components';

export default function HomePage() {
  return (
    <>
      <h1 className="text-white">Edit this page on app/home/page.tsx</h1>
      <Button as={NextLink} href="http://app.localhost:3000">
        Start creating
      </Button>
    </>
  );
}

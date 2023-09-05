import { Flex, Heading, Text } from '@/components/chakra';
import { NextImage } from '@/components/client';

export default function NotFoundSite() {
  return (
    <Flex>
      <Heading as="h1">404</Heading>
      <NextImage
        alt="missing site"
        src="https://illustrations.popsy.co/gray/falling.svg"
        width={400}
        height={400}
        className="dark:hidden"
      />
      <NextImage
        alt="missing site"
        src="https://illustrations.popsy.co/white/falling.svg"
        width={400}
        height={400}
        className="hidden dark:block"
      />
      <Text>Site does not exist, or you do not have permission to view it</Text>
    </Flex>
  );
}

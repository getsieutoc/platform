import { Flex, Heading } from '@/components/chakra';
import { NextImage } from '@/components/client';

export default function Overview() {
  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex
        width="100%"
        height="48px"
        direction="row"
        justify="space-between"
        align="center"
        gap={6}
      >
        <Heading as="h1" size="lg">
          Overview
        </Heading>
      </Flex>

      <Flex direction="column" alignItems="center">
        <Heading as="h1" size="3xl" color="gray">
          Under Construction
        </Heading>

        <NextImage priority src="/web-design.svg" alt="empty" height={400} width={400} />
      </Flex>
    </Flex>
  );
}

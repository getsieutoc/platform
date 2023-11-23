import { Flex, Heading } from '@/components/chakra';

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

      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Heading as="h3" size="md">
            Under Construction
          </Heading>
        </div>
      </div>
    </Flex>
  );
}

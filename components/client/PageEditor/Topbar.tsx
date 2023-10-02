import { Button, Flex, Heading, Stack } from '@/components/chakra';

export const Topbar = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      bg="whiteAlpha.200"
      paddingX={2}
      paddingY={1}
    >
      <Stack direction="row" align="center">
        <Heading size="sm">Page Editor</Heading>

        <Flex>
          <Button size="xs" variant="ghost" colorScheme="teal">
            New
          </Button>
          <Button size="xs" variant="ghost" colorScheme="teal">
            Open
          </Button>
          <Button size="xs" variant="ghost" colorScheme="teal">
            Export
          </Button>
          <Button size="xs" variant="ghost" colorScheme="teal">
            Import
          </Button>
        </Flex>
      </Stack>

      <Stack direction="row">
        <Button size="xs" variant="ghost" colorScheme="teal">
          Reset
        </Button>
        <Button size="xs" variant="ghost" colorScheme="teal">
          Save
        </Button>
      </Stack>
    </Flex>
  );
};

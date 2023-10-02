import { Button, Heading, Stack, Wrap, WrapItem } from '@/components/chakra';

export const Toolbox = () => {
  return (
    <Stack borderTop="none" borderWidth="1px" borderColor="whiteAlpha.200" padding={2}>
      <Heading size="sm">Components</Heading>

      <Wrap>
        <WrapItem>
          <Button size="sm" variant="outline">
            Button
          </Button>
        </WrapItem>
        <WrapItem>
          <Button size="sm" variant="outline">
            Heading
          </Button>
        </WrapItem>
      </Wrap>
    </Stack>
  );
};

import { Editor, Frame, Element } from '@craftjs/core';
import { Container, Flex } from '@/components/chakra';
import { Button, Text } from '@/components/users';

import { Topbar } from './Topbar';
import { Toolbox } from './Toolbox';
import { Settings } from './Settings';

export const PageEditor = () => {
  return (
    <Editor resolver={{ Button, Text, Container }}>
      <Flex direction="column" height="100%">
        <Topbar />

        <Flex>
          <Toolbox />
          <Flex flexGrow="1">
            <Frame>
              <Element
                is={Container}
                padding={5}
                background="blackAlpha.100"
                width="100%"
                canvas
              >
                <Button>Hello</Button>
                <Text>World</Text>
              </Element>
            </Frame>
          </Flex>

          <Settings />
        </Flex>
      </Flex>
    </Editor>
  );
};

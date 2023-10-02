import { Text as ChakraText, TextProps } from '@/components/chakra';
import { useNode } from '@craftjs/core';

export const Text = (props: TextProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return <ChakraText ref={(ref) => connect(drag(ref))} {...props} />;
};

Text.craft = {
  rules: {
    canDrag: (node) => node.data.props.text != 'Drag',
  },
};

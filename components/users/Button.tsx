import { Button as ChakraButton, ButtonProps } from '@/components/chakra';
import { useNode, UserComponent } from '@craftjs/core';

export const Button: UserComponent<ButtonProps> = (props) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return <ChakraButton ref={(ref) => connect(drag(ref))} {...props} />;
};

Button.craft = {
  rules: {
    canDrag: () => true,
  },
};

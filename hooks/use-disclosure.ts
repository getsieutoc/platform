import { useToggle } from 'react-use';

export const useDisclosure = () => {
  const [on, toggle] = useToggle(false);

  return {
    isOpen: on,
    onOpen: () => toggle(true),
    onClose: () => toggle(false),
  };
};

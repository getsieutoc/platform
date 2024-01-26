import {
  useCopyToClipboard,
  useColorModeValue,
  useDisclosure,
  useEffect,
  useState,
  useToast,
  useRef,
} from '@/hooks';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  Stack,
} from '@/components/chakra';
import { CopyIcon, SendIcon, StarIcon } from '@/icons';
import { UseChatHelpers } from '@/types';

export type ChatboxProps = UseChatHelpers;

export const Chatbox = ({
  input,
  isLoading,
  messages,
  handleSubmit,
  handleInputChange,
}: ChatboxProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [, copyToClipboard] = useCopyToClipboard();

  const [hoverId, setHoverId] = useState('');

  const { addToast } = useToast();

  const messagesRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  const handleScroll = () => {
    if (messagesRef.current) {
      const { offsetHeight, scrollHeight, scrollTop } = messagesRef.current;
      if (scrollHeight <= scrollTop + offsetHeight + 100) {
        messagesRef.current.scrollTo({
          behavior: 'smooth',
          top: scrollHeight,
          left: 0,
        });
      }
    }
  };

  useEffect(() => {
    handleScroll();
  }, [messages]);

  const grayAlpha = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const brandAlpha = useColorModeValue('brandDarkAlpha.300', 'brandDarkAlpha.300');

  return (
    <>
      <Button leftIcon={<StarIcon />} isLoading={isLoading} onClick={onOpen} size="md">
        Open Chat
      </Button>

      <Drawer
        initialFocusRef={inputRef}
        finalFocusRef={buttonRef}
        onClose={onClose}
        placement="left"
        isOpen={isOpen}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chat title</DrawerHeader>

          <DrawerBody>
            <Flex
              transform="translateZ(0)"
              direction="column"
              ref={messagesRef}
              overflowY="auto"
              height="100%"
              gap={3}
            >
              {messages.map((m) => (
                <Flex
                  direction={m.role === 'user' ? 'row-reverse' : 'row'}
                  key={m.id}
                  w="100%"
                >
                  <Box
                    onMouseLeave={() => m.role !== 'user' && setHoverId('')}
                    onMouseEnter={() => m.role !== 'user' && setHoverId(m.id)}
                    borderRadius="lg"
                    fontSize="sm"
                    bg={m.role === 'user' ? brandAlpha : grayAlpha}
                    maxW="70%"
                    px={4}
                    py={2}
                    position="relative"
                  >
                    {m.content}

                    {m.role !== 'user' && hoverId === m.id && (
                      <IconButton
                        onClick={() => {
                          copyToClipboard(m.content);
                          addToast({ description: 'Copied to clipboard' });
                        }}
                        icon={<CopyIcon />}
                        position="absolute"
                        variant="outline"
                        aria-label="Copy"
                        size="xs"
                        zIndex={3}
                        right={2}
                        top={2}
                      />
                    )}
                  </Box>
                </Flex>
              ))}
            </Flex>
          </DrawerBody>

          <form onSubmit={handleSubmit}>
            <DrawerFooter as={Stack} direction="row" spacing={2}>
              <Input
                onChange={handleInputChange}
                placeholder="Type here..."
                ref={inputRef}
                value={input}
                autoFocus
              />

              <IconButton
                isDisabled={!input || isLoading}
                aria-label="Send message"
                isLoading={isLoading}
                colorScheme="green"
                icon={<SendIcon />}
                type="submit"
              />
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

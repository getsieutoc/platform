'use client';

import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
  Text,
} from '@/components/chakra';
import { useColorModeValue, useDisclosure } from '@/hooks';

export default function LoadingPage() {
  const { onClose } = useDisclosure();

  const textColor = useColorModeValue('gray.200', 'gray.400');

  return (
    <Modal
      closeOnOverlayClick={false}
      closeOnEsc={false}
      onClose={onClose}
      isCentered
      size="md"
      isOpen
    >
      <ModalOverlay background="black" />

      <ModalContent background="transparent" shadow="none">
        <ModalBody
          background="transparent"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Flex
            background="transparent"
            justifyContent="center"
            alignItems="center"
            direction="column"
            width="100%"
          >
            <Spinner
              emptyColor="white"
              label="Loading..."
              color="brand.500"
              thickness="4px"
              speed="0.45s"
              size="lg"
            />

            <Text marginTop="10px" color={textColor}>
              Loading...
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

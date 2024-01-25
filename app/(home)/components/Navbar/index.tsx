'use client';

import {
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  StackDivider,
  VStack,
} from '@/components/chakra';
import { useColorModeValue, useAuth, useDisclosure, useRouter } from '@/hooks';
import { ButtonLink, Logo, ColorModeSwitcher } from '@/components/client';
import { HamburgerIcon } from '@/icons';

export const Navbar = () => {
  const router = useRouter();

  const { session } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const backgroundColor = useColorModeValue('white', 'black');

  const goto = (path: string) => {
    router.push(path);

    onClose();
  };

  return (
    <Flex as="header" bg={backgroundColor}>
      <Container
        justify="space-between"
        maxW="container.xl"
        align="center"
        height={53}
        as={Flex}
      >
        <Flex align="center" gap={16}>
          <Logo size="sm" pt={0.5} />

          <ButtonGroup
            display={{ base: 'none', md: 'flex' }}
            direction="row"
            variant="link"
            fontSize="sm"
            spacing={8}
            as={Stack}
            size="sm"
          >
            <ButtonLink href="/#features">Features</ButtonLink>

            <ButtonLink href="/#pricing">Pricing</ButtonLink>

            <ButtonLink href="/#highlights">Why us?</ButtonLink>
          </ButtonGroup>
        </Flex>

        <Flex display={{ base: 'none', md: 'flex' }} align="center" gap={6}>
          <ColorModeSwitcher />

          <ButtonGroup align="center" variant="link" spacing={8} as={Flex} size="sm">
            {session ? (
              <ButtonLink variant="solid" colorScheme="brand" href="/projects">
                Dashboard
              </ButtonLink>
            ) : (
              <ButtonLink variant="solid" colorScheme="brand" href="/login">
                Get Started
              </ButtonLink>
            )}
          </ButtonGroup>
        </Flex>

        <IconButton
          display={{ base: 'auto', md: 'none' }}
          aria-label="toggle-menu-home"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />

        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />

          <DrawerContent bg={backgroundColor}>
            <DrawerHeader borderBottomWidth="1px">
              <Logo size="sm" pt={0.5} />
            </DrawerHeader>

            <DrawerBody py={4}>
              <VStack
                divider={<StackDivider opacity="0.5" />}
                align="stretch"
                spacing={2}
              >
                <Button
                  onClick={() => goto('/#features')}
                  color="brand.500"
                  variant="link"
                  size="sm"
                  h="40px"
                >
                  Features
                </Button>

                <Button
                  onClick={() => goto('/#pricing')}
                  color="brand.500"
                  variant="link"
                  size="sm"
                  h="40px"
                >
                  Pricing
                </Button>

                <Button
                  onClick={() => goto('/#highlights')}
                  color="brand.500"
                  variant="link"
                  size="sm"
                  h="40px"
                >
                  Why us?
                </Button>
              </VStack>

              <Flex align="center" justify="space-between" w="100%">
                <ColorModeSwitcher />

                <ButtonGroup
                  align="center"
                  variant="link"
                  spacing={8}
                  as={Flex}
                  size="sm"
                >
                  {session ? (
                    <ButtonLink variant="solid" colorScheme="brand" href="/projects">
                      Dashboard
                    </ButtonLink>
                  ) : (
                    <ButtonLink variant="solid" colorScheme="brand" href="/login">
                      Get Started
                    </ButtonLink>
                  )}
                </ButtonGroup>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Container>
    </Flex>
  );
};

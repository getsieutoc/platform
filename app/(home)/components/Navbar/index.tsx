'use client';

import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  Stack,
  useColorModeValue,
} from '@/components/chakra';
import { NextLink, Logo, ColorModeSwitcher } from '@/components/client';

export const Navbar = () => {
  const backgroundColor = useColorModeValue('white', 'black');

  return (
    <Flex as="header" bg={backgroundColor}>
      <Container
        as={Flex}
        justify="space-between"
        align="center"
        height={53}
        maxW={{
          lg: 'container.lg',
          md: 'container.m',
          sm: 'container.sm',
          xl: 'container.xl',
        }}
      >
        <Flex align="center" gap={16}>
          <Logo width={90} height={27} />

          <ButtonGroup
            as={Stack}
            direction="row"
            spacing={8}
            fontSize="sm"
            variant="link"
            size="sm"
          >
            <Button as={NextLink} href="/">
              Home
            </Button>
            <Button as={NextLink} href="/#highlights">
              Why us?
            </Button>
            <Button as={NextLink} href="/#pricing">
              Pricing
            </Button>
            <Button as={NextLink} href="/">
              Blogs
            </Button>
          </ButtonGroup>
        </Flex>

        <Flex align="center" gap={16}>
          <ColorModeSwitcher />

          <ButtonGroup
            as={Flex}
            align="center"
            spacing={8}
            variant="link"
            size="sm"
            _hover={{ textDecoration: 'none' }}
          >
            <Button as={NextLink} href="/login">
              Login
            </Button>
            <Button as={NextLink} variant="solid" colorScheme="brand" href="/login">
              Get Started
            </Button>
          </ButtonGroup>
        </Flex>
      </Container>
    </Flex>
  );
};

'use client';

import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  Stack,
  useColorModeValue,
} from '@/components/chakra';
import { NextLink, Logo } from '@/components/client';

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
            <Button as={NextLink} href="/protected">
              Protected
            </Button>
            <Button as={NextLink} href="/about-us">
              About us
            </Button>
            <Button as={NextLink} href="/blog">
              Blogs
            </Button>
          </ButtonGroup>
        </Flex>

        <Flex align="center" gap={16}>
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
            <Button as={NextLink} href="/blog">
              Get Started
            </Button>
          </ButtonGroup>
        </Flex>
      </Container>
    </Flex>
  );
};

'use client';

import { Container, Flex, Stack, useColorModeValue } from '@/components/chakra';
import { NextLink, Logo } from '@/components/client';

export const Navbar = () => {
  const backgroundColor = useColorModeValue('white', 'black');

  return (
    <Flex as="header" bg={backgroundColor}>
      <Container
        as={Flex}
        justify="space-between"
        align="center"
        maxW={{
          lg: 'container.lg',
          md: 'container.m',
          sm: 'container.sm',
          xl: 'container.xl',
        }}
      >
        <Flex align="center" gap={16} height={53}>
          <Logo width={90} height={27} />

          <Stack direction="row" spacing={8} fontSize="sm">
            <NextLink href="/protected">Protected</NextLink>
            <NextLink href="/about-us">About us</NextLink>
            <NextLink href="/blog">Blogs</NextLink>
          </Stack>
        </Flex>
      </Container>
    </Flex>
  );
};

'use client';

import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  Stack,
  ButtonGroup,
} from '@/components/chakra';
import { GradientText } from '@/components/client';

export const HeroSection = () => {
  return (
    <Container maxW="full">
      <Center minHeight="80vh">
        <Container as={Stack} maxW="container.lg" textAlign="center" align="center">
          <Heading size="4xl" mb={4}>
            Sed do eiusmod tempor incididunt <GradientText>with speed</GradientText>
          </Heading>

          <Container maxW="container.md" textAlign="center">
            <Text fontSize="xl">
              Lorem ipsum dolor sit amet, consectetur continue adipiscing elit do eiusmod
              tinet lorem, ipsum dolor sit amet, consectetur sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
          </Container>

          <ButtonGroup mt={8} spacing={3} size="lg" colorScheme="brand">
            <Button variant="solid">Get started</Button>
            <Button variant="outline">Live demo</Button>
          </ButtonGroup>

          <Text my={2} fontSize="sm" color="gray.500">
            102+ builders have signed up in the last 30 days
          </Text>
        </Container>
      </Center>
    </Container>
  );
};

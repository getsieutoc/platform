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

export const HeroSection = () => {
  return (
    <Container maxW="container.lg">
      <Center p={4} minHeight="60vh">
        <Stack>
          <Container maxW="container.md" textAlign="center">
            <Heading size="3xl" mb={4}>
              Sed do eiusmod tempor incididunt consectetur
            </Heading>

            <Text fontSize="xl">
              Lorem ipsum dolor sit amet, consectetur continue adipiscing elit do eiusmod
              tinet lorem, ipsum dolor sit amet, consectetur
            </Text>

            <ButtonGroup mt={8} spacing={3} size="lg">
              <Button colorScheme="brand">Get started</Button>

              <Button>Live demo</Button>
            </ButtonGroup>

            <Text my={2} fontSize="sm" color="gray.500">
              102+ builders have signed up in the last 30 days
            </Text>
          </Container>
        </Stack>
      </Center>
    </Container>
  );
};

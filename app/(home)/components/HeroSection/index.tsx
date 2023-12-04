'use client';

import { Button, Center, Container, Heading, Text, VStack } from '@/components/chakra';

export const HeroSection = () => {
  return (
    <Container maxW="container.lg">
      <Center p={4} minHeight="70vh">
        <VStack>
          <Container maxW="container.md" textAlign="center">
            <Heading size="3xl" mb={4}>
              Sed do eiusmod tempor incididunt consectetur
            </Heading>

            <Text fontSize="xl">
              Lorem ipsum dolor sit amet, consectetur continue adipiscing elit do eiusmod
              tinet lorem, ipsum dolor sit amet, consectetur
            </Text>

            <Button mt={8} size="lg" colorScheme="brand">
              I need this for $10/month →
            </Button>

            <Text my={2} fontSize="sm" color="gray.500">
              102+ builders have signed up in the last 30 days
            </Text>
          </Container>
        </VStack>
      </Center>
    </Container>
  );
};

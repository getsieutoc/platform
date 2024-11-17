'use client';

import { Button } from '@/components/ui';
import { Center, Container, Heading, Text, Stack, Flex } from '@/components/chakra';
import { GradientText } from '@/components/client';
import {
  AwsLogo,
  ChakraLogo,
  GcpLogo,
  NextLogo,
  PrismaLogo,
  TypescriptLogo,
} from '@/icons';

export const HeroSection = () => {
  // const logoColor = useColorModeValue('gray.300', 'gray.700');

  return (
    <Container maxW="full">
      <Center minHeight="100vh">
        <Container as={Stack} maxW="container.lg" textAlign="center" alignItems="center">
          <Heading size="4xl" mb={4}>
            Start building modern apps <GradientText>with speed</GradientText>
          </Heading>

          <Container maxW="container.md" textAlign="center">
            <Text fontSize="xl">
              Lorem ipsum dolor sit amet, consectetur continue adipiscing elit do eiusmod
              tinet lorem, ipsum dolor sit amet, consectetur sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
          </Container>

          <Flex mt={8} gap={3}>
            <Button variant="solid" colorPalette="brand" size="lg">
              Get started
            </Button>
            <Button variant="outline" colorPalette="brand" size="lg">
              Live demo
            </Button>
          </Flex>

          <Text my={2} fontSize="sm" color="gray.500">
            102+ builders have signed up in the last 30 days
          </Text>

          <Center gap={12}>
            <NextLogo boxSize={16} />
            <PrismaLogo boxSize={14} />
            <TypescriptLogo boxSize={16} />
            <ChakraLogo boxSize={12} />
            <AwsLogo boxSize={16} />
            <GcpLogo boxSize={16} />
          </Center>
        </Container>
      </Center>
    </Container>
  );
};

'use client';

import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  Stack,
  ButtonGroup,
  useColorModeValue,
} from '@/components/chakra';
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
  const logoColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Container maxW="full">
      <Center minHeight="100vh">
        <Container as={Stack} maxW="container.lg" textAlign="center" align="center">
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

          <ButtonGroup mt={8} spacing={3} size="lg" colorScheme="brand">
            <Button variant="solid">Get started</Button>
            <Button variant="outline">Live demo</Button>
          </ButtonGroup>

          <Text my={2} fontSize="sm" color="gray.500">
            102+ builders have signed up in the last 30 days
          </Text>

          <Stack
            direction="row"
            justify="center"
            align="center"
            spacing={12}
            marginY={8}
            color={logoColor}
          >
            <NextLogo boxSize={16} />
            <PrismaLogo boxSize={14} />
            <TypescriptLogo boxSize={16} />
            <ChakraLogo boxSize={12} />
            <AwsLogo boxSize={16} />
            <GcpLogo boxSize={16} />
          </Stack>
        </Container>
      </Center>
    </Container>
  );
};

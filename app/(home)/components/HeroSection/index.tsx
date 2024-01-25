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
  Wrap,
  WrapItem,
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
  const logoColor = useColorModeValue('gray.300', 'gray.700');

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

          <Wrap
            color={logoColor}
            justify="center"
            // align="center"
            spacing={12}
            // marginY={8}
          >
            <WrapItem>
              <NextLogo boxSize={16} />
            </WrapItem>
            <WrapItem>
              <PrismaLogo boxSize={14} />
            </WrapItem>
            <WrapItem>
              <TypescriptLogo boxSize={16} />
            </WrapItem>
            <WrapItem>
              <ChakraLogo boxSize={12} />
            </WrapItem>
            <WrapItem>
              <AwsLogo boxSize={16} />
            </WrapItem>
            <WrapItem>
              <GcpLogo boxSize={16} />
            </WrapItem>
          </Wrap>
        </Container>
      </Center>
    </Container>
  );
};

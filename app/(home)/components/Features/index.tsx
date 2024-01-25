'use client';

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from '@/components/chakra';
import { useBreakpointValue, useColorMode, useColorModeValue } from '@/hooks';
import { NextImage } from '@/components/client';

const features = [
  {
    title: 'Effortless Menu Creation',
    description:
      'Instantly generate your restaurant menu from a Google Sheets link, simplifying the process for hassle-free updates and modifications.',
    image: 'https://sieutoc-general.s3.eu-central-1.amazonaws.com/platform-demo/first',
  },
  {
    title: 'Rich Built-in Tools',
    description:
      "Unlock a suite of free tools, including auto-generated QR codes, short links, and built-in analytics, empowering your restaurant's marketing without added costs.",
    image: 'https://sieutoc-general.s3.eu-central-1.amazonaws.com/platform-demo/second',
  },
];

export const Features = () => {
  const popColor = useColorModeValue('gray.200', 'gray.900');

  const { colorMode } = useColorMode();

  const height = useBreakpointValue({ base: 1080 / 4.84, md: 1080 / 2.2 });
  const width = useBreakpointValue({ base: 1920 / 4.84, md: 1290 / 1.4 });

  return (
    <VStack w="full" id="features" spacing={0} py={16}>
      {features.map(({ title, description, image }, i: number) => {
        const isSwapped = i % 2 === 0;

        const rowDirection = isSwapped ? 'row' : 'row-reverse';

        return (
          <Center
            bg={!isSwapped ? popColor : undefined}
            minH={[null, '90vh']}
            key={`feature_${i}`}
            w="full"
          >
            <Container maxW="container.xl" rounded="lg" pt={10} pb={16}>
              <Stack
                direction={['column', null, rowDirection]}
                alignItems="center"
                spacing={[4, 10]}
                w="full"
                h="full"
              >
                {image && (
                  <NextImage
                    src={`${image}-${colorMode}.png`}
                    alt={`Feature: ${title}`}
                    height={height}
                    width={width}
                    priority
                  />
                )}

                <VStack maxW={400} spacing={4} align={['center', 'flex-start']}>
                  <Box>
                    <Heading as="h3" fontSize="2xl" fontWeight="bold">
                      {title}
                    </Heading>
                  </Box>

                  <Text fontSize="md" color="gray.500" textAlign={['center', 'left']}>
                    {description}
                  </Text>

                  <Button
                    colorScheme="brand"
                    textAlign={['center', 'left']}
                    variant="link"
                  >
                    Learn more →
                  </Button>
                </VStack>
              </Stack>
            </Container>
          </Center>
        );
      })}
    </VStack>
  );
};

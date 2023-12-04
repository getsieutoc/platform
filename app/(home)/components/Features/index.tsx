import { Box, Button, Center, Container, Stack, Text, VStack } from '@/components/chakra';
import { NextImage } from '@/components/client';

const features = [
  {
    title: 'Detailed Analytics',
    description:
      "No more spending hours writing formulas in Excel to figure out how much you're making. We surface important metrics to keep your business going strong.",
    // image:
    //   'https://launchman-space.nyc3.digitaloceanspaces.com/chakra-ui-landing-page-feature-1.png',
  },
  {
    title: 'Track your clients',
    description:
      'Know when and how your projects are going so you can stay on top of delivery dates.',
    // image:
    //   'https://launchman-space.nyc3.digitaloceanspaces.com/chakra-ui-landing-page-feature-2.png',
  },
  {
    title: 'Manage projects',
    description:
      "You don't have to hunt your email inbox to find that one conversation. Every task, project, and client information is just a click away.",
    // image:
    //   'https://launchman-space.nyc3.digitaloceanspaces.com/chakra-ui-landing-page-feature-3.png',
  },
];

export const Features = () => {
  return (
    <VStack w="full" id="features" spacing={16} py={[16, 0]}>
      {features.map(({ title, description /* image */ }, i: number) => {
        const rowDirection = i % 2 === 1 ? 'row-reverse' : 'row';

        return (
          <Center key={`feature_${i}`} w="full" minH={[null, '90vh']}>
            <Container maxW="container.xl" rounded="lg">
              <Stack
                spacing={[4, 16]}
                alignItems="center"
                direction={['column', null, rowDirection]}
                w="full"
                h="full"
              >
                <Box rounded="lg">
                  {/* <NextImage */}
                  {/*   src={image} */}
                  {/*   width={684} */}
                  {/*   height={433} */}
                  {/*   alt={`Feature: ${title}`} */}
                  {/* /> */}
                </Box>

                <VStack maxW={500} spacing={4} align={['center', 'flex-start']}>
                  <Box>
                    <Text fontSize="3xl" fontWeight={600} align={['center', 'left']}>
                      {title}
                    </Text>
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

import { Box, Container, Heading, SimpleGrid, Text } from '@/components/chakra';

const highlights = [
  {
    icon: '✨',
    title: 'No-code',
    description:
      "We are No-Code friendly. There is no coding required to get started. Launchman connects with Airtable and lets you generate a new page per row. It's just that easy!",
  },
  {
    icon: '🎉',
    title: 'Make Google happy',
    description:
      "We render all our pages server-side; when Google's robots come to index your site, the page does not have to wait for JS to be fetched. This helps you get ranked higher.",
  },
  {
    icon: '😃',
    title: 'Rapid experimenting',
    description:
      "You don't have to wait hours to update your hard-coded landing pages. Figure out what resonates with your customers the most and update the copy in seconds",
  },
  {
    icon: '🔌',
    title: 'Rapid experimenting',
    description:
      "You don't have to wait hours to update your hard-coded landing pages. Figure out what resonates with your customers the most and update the copy in seconds",
  },
];

export const Highlights = () => {
  return (
    <Container id="highlights" maxW="container.md" centerContent py={[8, 28]}>
      <Heading as="h2" size="xl" textAlign="center" maxW="container.md" mb={10}>
        Why use Sieutoc?
      </Heading>

      <SimpleGrid spacingX={10} spacingY={10} minChildWidth="300px">
        {highlights.map(({ title, description, icon }, i: number) => (
          <Box p={4} rounded="md" key={`highlight_${i}`}>
            <Text fontSize="xl">{icon}</Text>

            <Heading as="h4" fontSize="lg" fontWeight="bold">
              {title}
            </Heading>

            <Text color="gray.500" mt={4}>
              {description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

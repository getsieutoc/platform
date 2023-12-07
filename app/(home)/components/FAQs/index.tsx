'use client';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Flex,
} from '@/components/chakra';

const data = [
  {
    question: 'Can I use the free plan for commercial purposes?',
    answer:
      'Yes, absolutely! We want to make sure that everyone can use pika.menu for free, whether it is for a small coffee shop or big restaurant use. However, we do have a fair use policy in place to prevent abuse. If you exceed the fair use policy, we may ask you to upgrade to the Pro plan.',
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer:
      'Yes, you can cancel your subscription at any time. If you cancel your subscription, you will still be able to use pika.menu until the end of your billing period. After that, you will be downgraded to the free plan.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'We currently do not offer refunds. However, you can cancel your subscription at any time, after which you will not be charged again. We are constantly working on improving Dub, so this might change in the future.',
  },
];

export const FAQs = () => {
  return (
    <Container maxW="container.xl" mb={20}>
      <Flex gap={10}>
        <Stack maxW="320px">
          <Heading as="h2" fontSize="4xl">
            FAQs
          </Heading>
          <Text>
            Everything you need to know about the product and billing. For questions about
            licensing, please see our licensing page.
          </Text>
        </Stack>

        <Accordion allowToggle width="100%">
          {data.map(({ question, answer }) => (
            <AccordionItem key={question}>
              <Heading as="h4">
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    py={3}
                    textAlign="left"
                    fontWeight="bold"
                    fontSize="large"
                  >
                    {question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4}>{answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </Container>
  );
};

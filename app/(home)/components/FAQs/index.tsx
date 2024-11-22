'use client';

import { Box, Heading, Container, Text, Stack, Flex } from '@/components/chakra';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui';

const data = [
  {
    value: 1,
    question: 'Can I use the free plan for commercial purposes?',
    answer:
      'Yes, absolutely! We want to make sure that everyone can use pika.menu for free, whether it is for a small coffee shop or big restaurant use. However, we do have a fair use policy in place to prevent abuse. If you exceed the fair use policy, we may ask you to upgrade to the Pro plan.',
  },
  {
    value: 2,
    question: 'Can I cancel my subscription at any time?',
    answer:
      'Yes, you can cancel your subscription at any time. If you cancel your subscription, you will still be able to use pika.menu until the end of your billing period. After that, you will be downgraded to the free plan.',
  },
  {
    value: 3,
    question: 'Do you offer refunds?',
    answer:
      'We currently do not offer refunds. However, you can cancel your subscription at any time, after which you will not be charged again. We are constantly working on improving Pika, so this might change in the future.',
  },
];

export const FAQs = () => {
  return (
    <Container maxW="container.lg" mb={20}>
      <Flex direction={{ base: 'column', md: 'row' }} gap={10}>
        <Stack
          maxW={{ base: '100%', md: '320px' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Heading as="h2" fontSize="4xl">
            FAQs
          </Heading>
          <Text>
            Everything you need to know about the product and billing. For questions about
            licensing, please see our licensing page.
          </Text>
        </Stack>

        <AccordionRoot collapsible width="100%">
          {data.map(({ value, question, answer }) => (
            <AccordionItem key={question} value={value}>
              <AccordionItemTrigger>
                <Box
                  fontWeight="bold"
                  textAlign="left"
                  fontSize="large"
                  as="span"
                  flex="1"
                  py={3}
                >
                  <Heading as="h4" size="md">
                    {question}
                  </Heading>
                </Box>
              </AccordionItemTrigger>
              <AccordionItemContent pb={6}>{answer}</AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </Flex>
    </Container>
  );
};

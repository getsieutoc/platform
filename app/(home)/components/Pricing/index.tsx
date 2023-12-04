'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
} from '@/components/chakra';
import { useState, useColorModeValue } from '@/hooks';
import { CheckCircleIcon } from '@/icons';

export type PricingBoxProps = {
  pro: boolean;
  name: string;
  isBilledAnnually: boolean;
};

export const PricingBox = ({ pro, name, isBilledAnnually }: PricingBoxProps) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const proBgColor = useColorModeValue('brand.100', 'brand.700');

  return (
    <Box
      boxShadow="sm"
      p={6}
      rounded="lg"
      bg={pro ? proBgColor : bgColor}
      borderColor={pro ? 'brand.500' : 'gray.200'}
      borderWidth={2}
    >
      <VStack spacing={3} align="flex-start">
        <Text fontWeight={600} casing="uppercase" fontSize="sm">
          {name}
        </Text>
        <Box w="full">
          {isBilledAnnually ? (
            <Text fontSize="3xl" fontWeight="medium">
              $89
            </Text>
          ) : (
            <Text fontSize="3xl" fontWeight="medium">
              $99
            </Text>
          )}
          <Text fontSize="sm">per month per site</Text>
        </Box>

        <Text>Unlock key features and higher usage limits</Text>
        <VStack>
          <Button size="sm" colorScheme="brand">
            Free 14-day trial →
          </Button>
        </VStack>

        <VStack pt={8} spacing={4} align="flex-start">
          <Text fontWeight="medium">Everything in Basic, plus:</Text>
          <List spacing={3}>
            <ListItem>
              <HStack align="flex-start" spacing={1}>
                <ListIcon as={CheckCircleIcon} color="brand.500" mt={1} />
                <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>
      </VStack>
    </Box>
  );
};

export type PricingSectionProps = {};

export const PricingSection = () => {
  const [isBilledAnnually, setIsBilledAnnually] = useState<boolean>(true);
  return (
    <Container py={28} maxW="container.lg" w="full" id="pricing">
      <VStack spacing={10} align="center">
        <ButtonGroup isAttached>
          <Button
            onClick={() => {
              setIsBilledAnnually(true);
            }}
            colorScheme={isBilledAnnually ? 'brand' : 'gray'}
          >
            Annually (-10%)
          </Button>

          <Button
            onClick={() => {
              setIsBilledAnnually(false);
            }}
            colorScheme={isBilledAnnually ? 'gray' : 'brand'}
          >
            Monthly
          </Button>
        </ButtonGroup>

        <SimpleGrid columns={[1, null, 3]} spacing={10}>
          <PricingBox pro={false} name="Starter" isBilledAnnually={isBilledAnnually} />

          <PricingBox pro={true} name="Creator" isBilledAnnually={isBilledAnnually} />

          <PricingBox pro={false} name="Enterprise" isBilledAnnually={isBilledAnnually} />
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

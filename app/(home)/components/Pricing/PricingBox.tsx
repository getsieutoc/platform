'>puse client';

import {
  Box,
  Button,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@/components/chakra';
import { BillCycle, PriceInfo, PriceValue } from '@/types';
import { useColorModeValue } from '@/hooks';
import { CheckIcon } from '@/icons';

export type PricingBoxProps = {
  name: string;
  featured?: boolean;
  price: PriceValue;
  cycle: BillCycle;
  onClick?: () => void;
} & PriceInfo;

export const PricingBox = ({
  ctaText,
  features,
  description,
  name,
  price,
  featured,
  cycle,
  onClick,
}: PricingBoxProps) => {
  const proBgColor = useColorModeValue('brand.50', 'brand.700');

  const bgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box
      borderColor={featured ? 'brand.300' : undefined}
      borderWidth={featured ? '3px' : undefined}
      bg={featured ? proBgColor : bgColor}
      borderRadius="lg"
      p={6}
    >
      <VStack spacing={3} align="flex-start">
        <Text fontWeight={600} casing="uppercase" fontSize="sm">
          {name}
        </Text>
        <Box w="full">
          {price.currency && (
            <Text as="span" fontSize="5xl" fontWeight="thin">
              {price.currency}
            </Text>
          )}
          <Text as="span" fontSize="5xl" fontWeight="bold">
            {price.value}
          </Text>
          {price.currency && (
            <Text as="span" fontSize="sm" fontWeight="bold">
              /month (billed {cycle})
            </Text>
          )}
        </Box>

        <Text>{description}</Text>

        <Button colorScheme="brand" onClick={onClick} size="lg">
          {ctaText ?? 'Free 14-day trial →'}
        </Button>

        <VStack pt={4} spacing={4} align="flex-start">
          <List spacing={3}>
            {features.map((feature, index) => (
              <ListItem key={`feature-${index}`}>
                <HStack align="flex-start" spacing={1}>
                  <ListIcon as={CheckIcon} color="brand.500" boxSize={2} mt={2} />
                  <Text>{feature}</Text>
                </HStack>
              </ListItem>
            ))}
          </List>
        </VStack>
      </VStack>
    </Box>
  );
};

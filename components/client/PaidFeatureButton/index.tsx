'use client';

import {
  ButtonProps,
  Button,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Modal,
  Stack,
  Heading,
  Text,
  ModalFooter,
  ListItem,
  List,
  ListIcon,
  Badge,
  Flex,
} from '@/components/chakra';
import { useDisclosure, useState, useColorModeValue } from '@/hooks';
import { CheckIcon, PremiumIcon } from '@/icons';
import { FEATURES } from '@/lib/constants';
import { BillCycle, Plan } from '@/types';
import { forwardRef } from 'react';

export type PaidFeatureButtonProps = ButtonProps & {
  requiredPlan?: Plan;
};

export const PaidFeatureButton = forwardRef<HTMLButtonElement, PaidFeatureButtonProps>(
  ({ requiredPlan = Plan.PRO, ...rest }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [cycle, setCycle] = useState<BillCycle>('yearly');

    const isYearly = cycle === 'yearly';

    const iconColor = useColorModeValue('yellow.500', 'yellow.300');

    const price = FEATURES[requiredPlan][cycle];

    return (
      <>
        <Button
          leftIcon={<PremiumIcon color={iconColor} />}
          onClick={onOpen}
          ref={ref}
          {...rest}
        />
        <Modal size="lg" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent as={Stack} spacing={2}>
            <ModalHeader>
              <PremiumIcon color={iconColor} /> This feature requires {requiredPlan} Plan
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody as={Stack} spacing={6}>
              <Flex justify="space-between" align="center">
                <Heading size="md" textAlign="start">
                  Billed {cycle}
                  <Badge
                    textTransform="lowercase"
                    colorScheme="green"
                    variant="outline"
                    borderRadius="lg"
                    marginBottom={1}
                    fontSize="0.9em"
                    marginLeft={2}
                    py={1}
                    px={2}
                  >
                    {price.currency}
                    {price.value}/month
                  </Badge>
                </Heading>

                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => {
                    if (cycle === 'yearly') {
                      setCycle('monthly');
                    } else {
                      setCycle('yearly');
                    }
                  }}
                >
                  Switch to {isYearly ? 'monthly' : 'yearly'}
                </Button>
              </Flex>
              <List spacing={1}>
                {FEATURES[requiredPlan].features.map((feature, index) => (
                  <ListItem key={`feature-${index}`}>
                    <Stack direction="row" align="flex-start" spacing={1}>
                      <ListIcon as={CheckIcon} color="brand.500" boxSize={2} mt={2} />
                      <Text>{feature}</Text>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </ModalBody>

            <ModalFooter as={Stack} spacing={6}>
              <Button size="lg" colorScheme="brand" onClick={onClose}>
                Upgrade to {requiredPlan} (billed {cycle})
              </Button>

              <Button size="xs" variant="link" onClick={onClose}>
                Compare plans
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
);

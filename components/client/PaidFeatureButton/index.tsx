'use client';

import {
  ButtonProps,
  Button,
  Heading,
  Text,
  Badge,
  Flex,
  VStack,
  HStack,
} from '@/components/chakra';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { useState, useDisclosure } from '@/hooks';
import { CheckIcon, PremiumIcon } from '@/icons';
import { FEATURES } from '@/lib/constants';
import { BillCycle, Plan } from '@/types';
import { forwardRef } from 'react';

export type PaidFeatureButtonProps = ButtonProps & {
  requiredPlan?: Plan;
};

export const PaidFeatureButton = forwardRef<HTMLButtonElement, PaidFeatureButtonProps>(
  ({ requiredPlan = Plan.PRO, children, ...rest }, ref) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const [cycle, setCycle] = useState<BillCycle>('yearly');

    const isYearly = cycle === 'yearly';

    // const iconColor = useColorModeValue('yellow.500', 'yellow.300');

    const price = FEATURES[requiredPlan][cycle];

    return (
      <DialogRoot size="lg" isOpen={isOpen} onClose={onClose}>
        <DialogTrigger asChild>
          <Button onClick={onOpen} ref={ref} {...rest}>
            <PremiumIcon /* color={iconColor} */ /> {children}
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <PremiumIcon /> This feature requires {requiredPlan} Plan
            </DialogTitle>
          </DialogHeader>

          <DialogBody>
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
            <VStack gap={1}>
              {FEATURES[requiredPlan].features.map((feature, index) => (
                <HStack key={`feature-${index}`} align="flex-start" gap={1}>
                  <CheckIcon color="brand.500" boxSize={2} mt={2} />
                  <Text>{feature}</Text>
                </HStack>
              ))}
            </VStack>
          </DialogBody>

          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>

            <Button>Save</Button>

            <Button size="lg" colorScheme="brand" onClick={onClose}>
              Upgrade to {requiredPlan} (billed {cycle})
            </Button>

            <Button size="xs" variant="plain" onClick={onClose}>
              Compare plans
            </Button>
          </DialogFooter>

          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    );
  }
);

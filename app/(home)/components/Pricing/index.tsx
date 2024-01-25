'use client';

import {
  Container,
  FormControl,
  FormLabel,
  Heading,
  SimpleGrid,
  Switch,
  SwitchProps,
  Text,
  VStack,
} from '@/components/chakra';
import { usePostHog, useRouter, useState } from '@/hooks';
import { GradientText } from '@/components/client';
import { FEATURES } from '@/lib/constants';
import { BillCycle, Plan } from '@/types';

import { PricingBox } from './PricingBox';

export const PricingSection = () => {
  const posthog = usePostHog();

  const router = useRouter();

  const [cycle, setCycle] = useState<BillCycle>('yearly');

  const isAnnually = cycle === 'yearly';

  const handleSwitch: SwitchProps['onChange'] = (e) => {
    if (e.target.checked) {
      setCycle('yearly');
    } else {
      setCycle('monthly');
    }
  };

  const handleSelectPrice = (planKey: string) => {
    posthog.capture('select_plan', {
      plan: planKey,
    });

    router.push(`/login?plan=${planKey}`);
  };

  return (
    <Container py={20} maxW="container.lg" id="pricing">
      <VStack spacing={10} align="center">
        <Heading
          size={{ base: 'xl', sm: '2xl' }}
          maxW="container.md"
          textAlign="center"
          as="h2"
        >
          Supercharge your business with{' '}
          <GradientText>enterprise&nbsp;level</GradientText> capabilities
        </Heading>

        <FormControl display="flex" alignItems="center" justifyContent="center">
          <FormLabel htmlFor="billed-annually" mb="0">
            Billed monthly
          </FormLabel>

          <Switch
            onChange={handleSwitch}
            isChecked={isAnnually}
            id="billed-annually"
            colorScheme="brand"
            size="lg"
          />

          <Text as="span" marginLeft={3}>
            Billed yearly (Save up to 37%)
          </Text>
        </FormControl>

        <SimpleGrid columns={[1, null, 3]} spacing={6}>
          {Object.entries(FEATURES).map(([k, v]) => (
            <PricingBox
              onClick={() => handleSelectPrice(k)}
              description={v.description}
              featured={k === Plan.PRO}
              features={v.features}
              ctaText={v.ctaText}
              price={v[cycle]}
              cycle={cycle}
              name={k}
              key={k}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

'use client';

import {
  Container,
  Fieldset,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@/components/chakra';
import { Field, Switch } from '@/components/ui';
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

  const handleSelectPrice = (planKey: string) => {
    posthog.capture('select_plan', {
      plan: planKey,
    });

    router.push(`/login?plan=${planKey}`);
  };

  return (
    <Container py={20} maxW="container.lg" id="pricing">
      <VStack gap={10} align="center">
        <Heading
          size={{ base: 'xl', sm: '2xl' }}
          maxW="container.md"
          textAlign="center"
          as="h2"
        >
          Supercharge your business with{' '}
          <GradientText>enterprise&nbsp;level</GradientText> capabilities
        </Heading>

        <Fieldset.Content display="flex" alignItems="center" justifyContent="center">
          <Field label="Billed monthly">
            <Switch
              onChange={setCycle}
              isChecked={isAnnually}
              id="billed-annually"
              colorScheme="brand"
              size="lg"
            />
          </Field>

          <Text as="span" marginLeft={3}>
            Billed yearly (Save up to 37%)
          </Text>
        </Fieldset.Content>

        <SimpleGrid columns={[1, null, 3]} gap={6}>
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

import { Box } from '@/components/chakra';

import { FAQs, Features, HeroSection, Highlights, PricingSection } from './components';

export default async function HomePage() {
  return (
    <Box maxW="full">
      <HeroSection />

      <Features />

      <PricingSection />

      <Highlights />

      <FAQs />
    </Box>
  );
}

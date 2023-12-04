import { Box, Button, Container, Heading } from '@/components/chakra';
import { NextLink } from '@/components/client';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

import { Features, HeroSection, Highlights, Navbar, PricingSection } from './components';

export default async function HomePage() {
  const session = await getSession();

  if (session) {
    redirect('/projects');
  }

  return (
    <Box>
      <Navbar />

      <HeroSection />

      <Features />

      <Highlights />

      <PricingSection />
    </Box>
  );
}

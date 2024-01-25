import { SubscribeForm } from '@/components/client';
import { LISTMONK_LISTS } from '@/lib/constants';
import { Box, Flex } from '@/components/chakra';
import { ReactNode } from 'react';

import { Navbar, Footer } from './components';

export default async function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <Flex direction="column" height="100vh">
      <Navbar />

      <Box padding={0} width="100%" overflowY="scroll">
        {children}

        <Footer>
          <SubscribeForm
            heading="Subscribe for newsletter"
            lists={[LISTMONK_LISTS.OptIn]}
          />
        </Footer>
      </Box>
    </Flex>
  );
}

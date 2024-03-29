'use client';

import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  UnorderedList,
  ListItem,
} from '@/components/chakra';
import { ButtonLink, ColorModeBox, Logo } from '@/components/client';
import { ReactNode } from '@/types';

type FooterLink = {
  label: string;
  url: string;
  isExternal?: boolean;
};

const footerLinkColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Docs',
    links: [
      { label: 'Get Started', url: '/' },
      { label: 'Services', url: '/' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Discord', url: 'https://discord.gg/YFKjGjDgnb', isExternal: true },
      { label: 'Twitter', url: 'https://twitter.com/SieutocWebsite', isExternal: true },
      {
        label: 'Facebook',
        url: 'https://www.facebook.com/sieutoc.website',
        isExternal: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/websitesieutoc/platform',
        isExternal: true,
      },
    ],
  },
  {
    title: 'Other',
    links: [
      { label: 'About', url: '/' },
      { label: 'Blog', url: '/' },
      { label: 'Privacy Policy', url: '/' },
      { label: 'Terms Of Service', url: '/' },
    ],
  },
];

export const Footer = ({ children }: { children?: ReactNode }) => {
  return (
    <Flex id="footer" as={ColorModeBox} minH="20vh" py={20}>
      <Container
        maxW="container.lg"
        direction="column"
        align="center"
        spacing={20}
        as={Stack}
      >
        {children}

        <SimpleGrid width="100%" minChildWidth="140px" spacing={10}>
          {footerLinkColumns.map(({ title, links }) => (
            <Stack key={title} ml={{ base: 6, md: 0 }}>
              <Heading as="h4" fontSize="md" fontWeight="bold" mb={4}>
                {title}
              </Heading>

              <UnorderedList minH={20} listStyleType="none" marginInline={0} spacing={2}>
                {links.map(({ label, url, isExternal }) => (
                  <ListItem key={label}>
                    <ButtonLink href={url} isExternal={isExternal}>
                      {label}
                    </ButtonLink>
                  </ListItem>
                ))}
              </UnorderedList>
            </Stack>
          ))}
        </SimpleGrid>

        <Logo size="sm" />
      </Container>
    </Flex>
  );
};

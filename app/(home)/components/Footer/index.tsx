'use client';

import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
  ListItem,
  useColorModeValue,
} from '@/components/chakra';
import { ColorModeBox, Logo, NextLink } from '@/components/client';
import { ExternalLinkIcon } from '@/icons';

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
      { label: 'Discord', url: '/', isExternal: true },
      { label: 'Twitter', url: '/', isExternal: true },
      { label: 'Facebook', url: '/', isExternal: true },
      { label: 'GitHub', url: '/', isExternal: true },
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
export const Footer = () => {
  const inputBgColor = useColorModeValue('gray.100', 'gray.800');

  return (
    <Flex as={ColorModeBox} minH="20vh" py={20}>
      <Container
        as={Stack}
        direction="column"
        align="center"
        spacing={20}
        maxW={{
          lg: 'container.lg',
          md: 'container.m',
          sm: 'container.sm',
          xl: 'container.xl',
        }}
      >
        <SimpleGrid
          minChildWidth="300px"
          maxW="container.lg"
          spacingX={10}
          spacingY={10}
          mb={4}
        >
          <Stack spacing={0}>
            <Heading as="h3" fontSize="3xl" fontWeight="bold">
              Subscribe for updates
            </Heading>
            <Text fontSize="sm">
              By subscribing, you agree with our <NextLink href="/">Terms</NextLink> and{' '}
              <NextLink href="/">Privacy Policy.</NextLink>
            </Text>
          </Stack>
          <FormControl as={Stack} direction="row">
            <FormLabel hidden>Subscribe</FormLabel>
            <Input size="lg" bgColor={inputBgColor} focusBorderColor="brand.500" />
            <Button colorScheme="brand" size="lg">
              Subscribe
            </Button>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid width="100%" minChildWidth="140px" spacing={10}>
          {footerLinkColumns.map(({ title, links }) => (
            <Stack key={title}>
              <Heading as="h4" fontSize="md" fontWeight="bold" mb={4}>
                {title}
              </Heading>

              <UnorderedList minH={20} listStyleType="none" marginInline={0} spacing={2}>
                {links.map(({ label, url, isExternal }) => (
                  <ListItem key={label}>
                    <Button variant="link" size="sm" as={NextLink} href={url}>
                      {label}
                    </Button>{' '}
                    {isExternal && <ExternalLinkIcon mx="2px" />}
                  </ListItem>
                ))}
              </UnorderedList>
            </Stack>
          ))}
        </SimpleGrid>

        <Logo width={128} height={37} />
      </Container>
    </Flex>
  );
};

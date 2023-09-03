'use client';

import { useParams, useSelectedLayoutSegments } from 'next/navigation';
import { type ReactNode, useMemo } from 'react';
import {
  Box,
  Button,
  Flex,
  NextImage,
  NextLink,
  Stack,
  useColorModeValue,
} from '@/components';
import { ArrowBackIcon, DashboardIcon, GlobeIcon, InsertChartIcon } from '@/icons';

export const Navbar = ({ children }: { children: ReactNode }) => {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const tabs = useMemo(() => {
    if (segments[0] === 'sites' && id) {
      return [
        {
          name: 'Back to All Sites',
          href: '/sites',
          icon: <ArrowBackIcon width={18} />,
        },
        {
          name: 'Analytics',
          href: `/sites/${id}/analytics`,
          isActive: segments.includes('analytics'),
          icon: <InsertChartIcon width={18} />,
        },
      ];
    }

    return [
      {
        name: 'Overview',
        href: '/',
        isActive: segments.length === 0,
        icon: <DashboardIcon width={18} />,
      },
      {
        name: 'Sites',
        href: '/sites',
        isActive: segments[0] === 'sites',
        icon: <GlobeIcon width={18} />,
      },
    ];
  }, [segments, id]);

  const backgroundColor = useColorModeValue('gray.100', 'gray.900');

  return (
    <Flex
      direction="column"
      width="240px"
      height="100vh"
      justify="space-between"
      background={backgroundColor}
      padding={4}
    >
      <Box>
        <NextLink href="/">
          <NextImage src="/logo.png" width={12} height={12} alt="Logo" />
        </NextLink>

        <Stack marginTop={6} spacing={1}>
          {tabs.map(({ name, href, icon, isActive }) => (
            <Button
              key={name}
              as={NextLink}
              justifyContent="start"
              width="100%"
              href={href}
              leftIcon={icon}
              colorScheme={isActive ? 'green' : 'blackAlpha'}
              variant={isActive ? 'outline' : 'ghost'}
            >
              {name}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box>{children}</Box>
    </Flex>
  );
};

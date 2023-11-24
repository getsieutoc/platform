'use client';

import { Box, Button, Flex, Stack, useColorModeValue } from '@/components/chakra';
import { useParams, useSelectedLayoutSegments } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { ArrowBackIcon, BarChartIcon, DashboardIcon, GlobeIcon } from '@/icons';

import { NextLink } from '../NextLink';
import { NextImage } from '../NextImage';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export const Navbar = ({ children }: { children: ReactNode }) => {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const tabs = useMemo(() => {
    if (segments[0] === 'sites' && id) {
      return [
        {
          name: 'Back to All Sites',
          href: '/sites',
          icon: <ArrowBackIcon boxSize={4} />,
        },
        {
          name: 'General',
          href: `/sites/${id}`,
          icon: <DashboardIcon boxSize={4} />,
          isActive: !segments[2],
        },
      ];
    }

    return [
      {
        name: 'Overview',
        href: '/',
        isActive: segments.length === 0,
        icon: <BarChartIcon boxSize={4} />,
      },
      {
        name: 'Sites',
        href: '/sites',
        isActive: segments[0] === 'sites',
        icon: <GlobeIcon boxSize={4} />,
      },
    ];
  }, [segments, id]);

  const backgroundColor = useColorModeValue('white', 'black');
  const logoPath = useColorModeValue('/light.png', '/dark.png');

  return (
    <Flex
      direction="column"
      width={{ sm: '240px', lg: '420px' }}
      height="100vh"
      justify="space-between"
      background={backgroundColor}
      padding={4}
    >
      <Box>
        <Flex direction="row" justify="space-between" align="end">
          <NextLink href="/">
            <NextImage priority src={logoPath} width={128} height={37} alt="Logo" />
          </NextLink>

          <ColorModeSwitcher size="sm" />
        </Flex>

        <Stack marginTop={6} spacing={1}>
          {tabs.map(({ name, href, icon, isActive }) => (
            <Button
              key={name}
              colorScheme={isActive ? 'green' : 'gray'}
              variant={isActive ? 'solid' : 'ghost'}
              justifyContent="start"
              leftIcon={icon}
              width="100%"
              as={NextLink}
              href={href}
              size="sm"
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

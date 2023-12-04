'use client';

import {
  useAuth,
  useColorModeValue,
  useMemo,
  useParams,
  useSelectedLayoutSegments,
} from '@/hooks';
import { ArrowBackIcon, DashboardIcon, GlobeIcon, UsersIcon } from '@/icons';
import { ColorModeSwitcher, NextLink, Logo } from '@/components/client';
import { Box, Button, Flex, Stack } from '@/components/chakra';
import { ReactNode, UserRole } from '@/types';

export type NavbarProps = {
  children: ReactNode;
};

export const Sidebar = ({ children }: NavbarProps) => {
  const { session } = useAuth();
  const { id } = useParams() as { id?: string };

  const segments = useSelectedLayoutSegments();

  const tabs = useMemo(() => {
    if (segments[0] === 'projects' && id) {
      return [
        {
          name: 'Back to All Projects',
          href: '/projects',
          icon: <ArrowBackIcon boxSize={4} />,
          isActive: false,
          visible: {
            [UserRole.ADMIN]: true,
            [UserRole.USER]: true,
          },
        },
        {
          name: 'General',
          href: `/projects/${id}`,
          icon: <DashboardIcon boxSize={4} />,
          isActive: !segments[2],
          visible: {
            [UserRole.ADMIN]: true,
            [UserRole.USER]: true,
          },
        },
      ];
    }

    return [
      {
        name: 'Projects',
        href: '/projects',
        icon: <GlobeIcon boxSize={4} />,
        isActive: segments[0] === 'projects',
        visible: {
          [UserRole.ADMIN]: true,
          [UserRole.USER]: true,
        },
      },
      {
        name: 'Users',
        href: '/users',
        icon: <UsersIcon boxSize={4} />,
        isActive: segments[0] === 'users',
        visible: {
          [UserRole.ADMIN]: true,
          [UserRole.USER]: false,
        },
      },
    ];
  }, [segments, id]);

  const backgroundColor = useColorModeValue('white', 'black');

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
          <Logo width={128} height={37} />

          <ColorModeSwitcher size="sm" />
        </Flex>

        {session && (
          <Stack marginTop={6} spacing={1}>
            {tabs
              .filter(({ visible }) => visible[session?.user.role])
              .map(({ name, href, icon, isActive }) => (
                <Button
                  key={name}
                  colorScheme={isActive ? 'brand' : 'gray'}
                  variant={isActive ? 'outline' : 'ghost'}
                  justifyContent="start"
                  width="100%"
                  leftIcon={icon}
                  as={NextLink}
                  href={href}
                >
                  {name}
                </Button>
              ))}
          </Stack>
        )}
      </Box>

      <Box>{children}</Box>
    </Flex>
  );
};

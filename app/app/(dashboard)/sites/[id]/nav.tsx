'use client';

import { Button, Stack, NextLink } from '@/components';
import { useParams, useSelectedLayoutSegment } from 'next/navigation';

export default function SiteSettingsNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: 'General',
      href: `/sites/${id}`,
      segment: null,
    },
    {
      name: 'Domains',
      href: `/sites/${id}/domains`,
      segment: 'domains',
    },
    {
      name: 'Appearance',
      href: `/sites/${id}/appearance`,
      segment: 'appearance',
    },
  ];

  const checkVariant = (item: (typeof navItems)[0]) => {
    if (segment === item.segment) {
      return 'solid';
    }

    return 'ghost';
  };

  return (
    <Stack direction="row">
      {navItems.map((item) => (
        <Button
          as={NextLink}
          key={item.name}
          href={item.href}
          variant={checkVariant(item)}
        >
          {item.name}
        </Button>
      ))}
    </Stack>
  );
}

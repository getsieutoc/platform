'use client';

import { ArrowLeft, BarChart3 } from 'lucide-react';
import { useParams, useSelectedLayoutSegments } from 'next/navigation';
import { type ReactNode, useMemo } from 'react';
import { NextLink, NextImage } from '@/components';
import { DashboardIcon, GlobeIcon } from '@/icons';

export const Navbar = ({ children }: { children: ReactNode }) => {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const tabs = useMemo(() => {
    if (segments[0] === 'site' && id) {
      return [
        {
          name: 'Back to All Sites',
          href: '/sites',
          icon: <ArrowLeft width={18} />,
        },
        {
          name: 'Analytics',
          href: `/site/${id}/analytics`,
          isActive: segments.includes('analytics'),
          icon: <BarChart3 width={18} />,
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

  return (
    <div>
      <div className="grid gap-2">
        <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
          <NextLink href="/">
            <NextImage src="/logo.png" width={12} height={12} alt="Logo" />
          </NextLink>
        </div>

        <div className="grid gap-1">
          {tabs.map(({ name, href, icon }) => (
            <NextLink key={name} href={href}>
              {icon}
              <span>{name}</span>
            </NextLink>
          ))}
        </div>
      </div>
      <div>
        <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
        {children}
      </div>
    </div>
  );
};

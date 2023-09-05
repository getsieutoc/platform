'use client';

import OriginalNextLink, { type LinkProps } from 'next/link';
import { chakra } from '@/components/chakra';

export const NextLink = chakra<typeof OriginalNextLink, LinkProps>(
  OriginalNextLink,
  {
    shouldForwardProp: (prop) =>
      [
        'children',
        'href',
        'legacyBehavior',
        'locale',
        'passHref',
        'prefetch',
        'replace',
        'scroll',
        'shallow',
        'target',
      ].includes(prop),
  }
);

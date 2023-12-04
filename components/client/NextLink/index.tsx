'use client';

import { chakra } from '@/components/chakra';
import Link, { LinkProps } from 'next/link';

export const NextLink = chakra<typeof Link, LinkProps>(Link, {
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
  baseStyle: {
    color: 'gray',

    _hover: {
      color: 'brand.500',
    },
  },
});

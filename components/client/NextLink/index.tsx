'use client';

import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';
import { ExternalLinkIcon } from '@/icons';

import { forwardRef } from 'react';

export type NextLinkProps = LinkProps &
  ChakraLinkProps & {
    isExternal?: boolean;
  };
export const NextLink = forwardRef<HTMLAnchorElement, NextLinkProps>(
  ({ href, children, isExternal, ...rest }, ref) => {
    return (
      <ChakraLink asChild {...rest}>
        <Link ref={ref} href={href}>
          {children} {isExternal && <ExternalLinkIcon />}
        </Link>
      </ChakraLink>
    );
  }
);

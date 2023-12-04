'use client';

import Link, { LinkProps } from 'next/link';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

export const NextLink = (props: ChakraLinkProps & LinkProps) => {
  return <ChakraLink as={Link} {...props}></ChakraLink>;
};

// import { chakra } from '@/components/chakra';

// export const NextLink = chakra<typeof OriginalNextLink, LinkProps>(OriginalNextLink, {
//   shouldForwardProp: (prop) =>
//     [
//       'children',
//       'href',
//       'legacyBehavior',
//       'locale',
//       'passHref',
//       'prefetch',
//       'replace',
//       'scroll',
//       'shallow',
//       'target',
//     ].includes(prop),
//   baseStyle: {
//     color: 'gray',
//   },
// });

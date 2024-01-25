'use client';

import { Button, ButtonProps, chakra, useColorModeValue } from '@/components/chakra';
import Link, { LinkProps } from 'next/link';
import { ExternalLinkIcon } from '@/icons';

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
});

export type ButtonLinkProps = {
  isExternal?: boolean;
} & LinkProps &
  ButtonProps;

export const ButtonLink = ({
  variant = 'link',
  isExternal,
  children,
  href,
  ...rest
}: ButtonLinkProps) => {
  const strength = useColorModeValue(600, 500);

  const textColor = variant === 'link' ? `brand.${strength}` : undefined;

  return (
    <Button
      target={isExternal ? '_blank' : '_self'}
      variant={variant}
      color={textColor}
      as={NextLink}
      href={href}
      size="sm"
      {...rest}
    >
      {children} {isExternal && <ExternalLinkIcon mx={1} boxSize="0.8rem" />}
    </Button>
  );
};

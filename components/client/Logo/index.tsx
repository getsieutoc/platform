'use client';

import { NextImage, NextImageProps, NextLink } from '@/components/client';
import { useColorModeValue } from '@/hooks';

export type LogoProps = Pick<NextImageProps, 'width' | 'height'>;

export const Logo = (props: LogoProps) => {
  const logoPath = useColorModeValue('/light.png', '/dark.png');

  return (
    <NextLink href="/">
      <NextImage
        priority
        src={logoPath}
        alt="Sieutoc Logo"
        placeholder="empty"
        {...props}
      />
    </NextLink>
  );
};

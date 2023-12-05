'use client';

import { NextLink, NextImage, NextImageProps } from '@/components/client';
import { useColorModeValue } from '@/hooks';
import { forwardRef } from 'react';

export type LogoProps = Pick<NextImageProps, 'width' | 'height'> & {
  href?: string;
  revert?: boolean;
};

export const Logo = forwardRef<HTMLAnchorElement, LogoProps>(
  ({ href = '/', revert, ...rest }, ref) => {
    const lightPath = revert ? '/dark.png' : '/light.png';
    const darkPath = revert ? '/light.png' : '/dark.png';
    const logoPath = useColorModeValue(lightPath, darkPath);

    return (
      <NextLink ref={ref} href={href}>
        <NextImage
          priority
          src={logoPath}
          alt="Sieutoc Logo"
          placeholder="empty"
          {...rest}
        />
      </NextLink>
    );
  }
);

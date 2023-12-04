'use client';

import { NextImage, NextImageProps, NextLink } from '@/components/client';
import { useColorModeValue } from '@/hooks';

export type LogoProps = Pick<NextImageProps, 'width' | 'height'> & {
  revert?: boolean;
};

export const Logo = ({ revert, ...rest }: LogoProps) => {
  const lightPath = revert ? '/dark.png' : '/light.png';
  const darkPath = revert ? '/light.png' : '/dark.png';
  const logoPath = useColorModeValue(lightPath, darkPath);

  return (
    <NextLink href="/">
      <NextImage
        priority
        src={logoPath}
        alt="Sieutoc Logo"
        placeholder="empty"
        {...rest}
      />
    </NextLink>
  );
};

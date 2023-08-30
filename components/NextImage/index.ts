'use client';

import OriginalNextImage, { type ImageProps } from 'next/image';
import { chakra } from '@chakra-ui/react';

export const NextImage = chakra<typeof OriginalNextImage, ImageProps>(
  OriginalNextImage,
  {
    shouldForwardProp: (prop) =>
      ['height', 'width', 'quality', 'src', 'alt', 'priority'].includes(prop),
  }
);

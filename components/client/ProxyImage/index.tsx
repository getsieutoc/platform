import { queryStringify } from '@/lib/parsers';
import { NextImage, NextImageProps } from '../NextImage';
import { useSWR } from '@/hooks';
import { Skeleton } from '@/components/chakra';

// TODO: Add options for proxy options like crop and resizing
export type ProxyImageProps = NextImageProps;

export const ProxyImage = ({ src, ...rest }: ProxyImageProps) => {
  const { data, isLoading } = useSWR<{ url: string }>(
    src ? `/api/imgproxy?${queryStringify({ src })}` : null
  );

  if (!data || isLoading) return <Skeleton h="10px" />;

  return <NextImage {...rest} src={data.url} />;
};

import type { DomainResponse, DomainVerificationStatusProps } from '@/types';
import { fetcher } from '@/lib/utils';
import useSWR from 'swr';

export function useDomainStatus({ domain }: { domain: string }) {
  const { data, isValidating } = useSWR<{
    status: DomainVerificationStatusProps;
    domainJson: DomainResponse & { error: { code: string; message: string } };
  }>(`/api/domain/${domain}/verify`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 5000,
    keepPreviousData: true,
  });

  return {
    status: data?.status,
    domainJson: data?.domainJson,
    loading: isValidating,
  };
}

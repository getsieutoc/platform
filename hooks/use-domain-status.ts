import type { DomainResponse, DomainVerificationStatusProps } from '@/types';
import { fetcher } from '@/lib/utils';
import useSWR from 'swr';

export type UseDomainStatusOptions = {
  siteId?: string | null;
  domain: string;
};
export function useDomainStatus({ siteId, domain }: UseDomainStatusOptions) {
  const { data, isValidating } = useSWR<{
    status: DomainVerificationStatusProps;
    domainJson: DomainResponse & { error: { code: string; message: string } };
  }>(siteId ? `/api/domain/${domain}/verify?siteId=${siteId}` : null, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 15000,
    keepPreviousData: true,
  });

  return {
    status: data?.status,
    domainJson: data?.domainJson,
    loading: isValidating,
  };
}

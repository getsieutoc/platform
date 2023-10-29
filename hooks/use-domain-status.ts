import type { DomainResponse, DomainVerificationMessage } from '@/types';
import { AlertProps } from '@/components/chakra';
import { fetcher } from '@/lib/utils';
import useSWR from 'swr';

export type UseDomainStatusOptions = {
  siteId?: string | null;
  domain: string;
};
export function useDomainStatus({ siteId, domain }: UseDomainStatusOptions) {
  const { data, isValidating, isLoading } = useSWR<{
    status: AlertProps['status'];
    message: DomainVerificationMessage;
    domainJson: DomainResponse & { error: { code: string; message: string } };
  }>(siteId ? `/api/domain/${domain}/verify?siteId=${siteId}` : null, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 10000,
    keepPreviousData: true,
  });

  return {
    status: data?.status,
    message: data?.message,
    domainJson: data?.domainJson,
    isLoading: isValidating || isLoading,
  };
}

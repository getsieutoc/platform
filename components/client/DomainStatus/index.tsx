'use client';

import { CheckCircleIcon, InfoIcon, WarningTwoIcon } from '@/icons';
import { useDomainStatus } from '@/hooks';

import { Spinner } from '@/components/chakra';

export default function DomainStatus({
  siteId,
  domain,
}: {
  siteId?: string | null;
  domain: string;
}) {
  const { message, isLoading } = useDomainStatus({ siteId, domain });

  return isLoading ? (
    <Spinner />
  ) : message === 'Valid Configuration' ? (
    <CheckCircleIcon color="green" />
  ) : message === 'Pending Verification' ? (
    <InfoIcon color="orange" />
  ) : (
    <WarningTwoIcon color="red" />
  );
}

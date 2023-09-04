'use client';

import { CheckCircleIcon, InfoIcon, WarningTwoIcon } from '@/icons';
import { Spinner } from '@chakra-ui/react';

import { useDomainStatus } from './use-domain-status';

export default function DomainStatus({
  siteId,
  domain,
}: {
  siteId?: string | null;
  domain: string;
}) {
  const { status, loading } = useDomainStatus({ siteId, domain });

  return loading ? (
    <Spinner />
  ) : status === 'Valid Configuration' ? (
    <CheckCircleIcon color="green" />
  ) : status === 'Pending Verification' ? (
    <InfoIcon color="orange" />
  ) : (
    <WarningTwoIcon color="red" />
  );
}

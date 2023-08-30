'use client';

import { useModal } from '@/components/modal/provider';
import { ReactNode } from 'react';
import { Button } from '@/components';
import { AddIcon } from '@/icons';

export default function CreateSiteButton({ children }: { children: ReactNode }) {
  const modal = useModal();
  return (
    <Button
      leftIcon={<AddIcon />}
      colorScheme="green"
      size="lg"
      onClick={() => modal?.show(children)}
    >
      Create New Site
    </Button>
  );
}

import { nanoid } from '@/lib/generators';
import { useState } from 'react';

type UseNanoReturn = {
  id: string;
  regen: () => void;
};

export const useNano = (length = 6): UseNanoReturn => {
  const [id, setId] = useState(() => nanoid(length));

  const regen = () => {
    const newId = nanoid(length);
    setId(newId);
  };

  return { id, regen };
};

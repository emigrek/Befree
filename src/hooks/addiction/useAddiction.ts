import { useEffect, useState } from 'react';

import { useAuthStore, useGlobalStore } from '@/store';

export interface UseAddictionProps {
  id: string;
}

export const useAddiction = ({ id }: UseAddictionProps) => {
  const user = useAuthStore(state => state.user);
  const getAddiction = useGlobalStore(state => state.getAddiction);
  const [addiction, setAddiction] = useState<Addiction | null>(null);

  useEffect(() => {
    if (!user) return;

    setAddiction(getAddiction(id));
  }, [id, user, getAddiction]);

  return addiction;
};

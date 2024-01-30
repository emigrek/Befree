import { useMemo } from 'react';

import { useGlobalStore } from '@/store';

export interface UseAddictionProps {
  id: string;
}

export const useAddiction = ({ id }: UseAddictionProps) => {
  const addictions = useGlobalStore(state => state.addictions);

  return useMemo(() => {
    return addictions.find(addiction => addiction.id === id) || null;
  }, [addictions, id]);
};

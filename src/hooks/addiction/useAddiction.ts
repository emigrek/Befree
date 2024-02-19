import { useMemo } from 'react';

import { useAddictionsStore } from '@/store';
import { Addiction } from '@/structures';

export interface UseAddictionProps {
  id: string;
}

export const useAddiction = ({ id }: UseAddictionProps): Addiction | null => {
  const addictions = useAddictionsStore(state => state.addictions);

  return useMemo(() => {
    return addictions.find(addiction => addiction.id === id) || null;
  }, [addictions, id]);
};

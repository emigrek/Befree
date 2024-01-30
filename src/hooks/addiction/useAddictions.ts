import { useMemo } from 'react';

import { useGlobalStore } from '@/store';
import { getSortingFunction } from '@/store/addictions';

interface UseAddictionProps {
  hidden?: boolean;
}

export const useAddictions = ({ hidden = false }: UseAddictionProps = {}) => {
  const {
    addictions: rawAddictions,
    addictionsLoading,
    sorting,
  } = useGlobalStore(state => ({
    addictions: state.addictions,
    addictionsLoading: state.addictionsLoading,
    sorting: state.sorting,
  }));

  const addictions = useMemo(() => {
    return rawAddictions
      .filter(addiction => (hidden ? addiction.hidden : !addiction.hidden))
      .sort(getSortingFunction(sorting));
  }, [rawAddictions, hidden, sorting]);

  return { addictionsLoading, addictions };
};

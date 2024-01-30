import { useCallback, useMemo } from 'react';

import { useGlobalStore } from '@/store';

interface UseSelectedProps {
  id: string;
}

export const useSelected = ({ id }: UseSelectedProps) => {
  const { selected, addSelected, removeSelected } = useGlobalStore(state => ({
    selected: state.selected,
    addSelected: state.addSelected,
    removeSelected: state.removeSelected,
  }));

  const isSelected = useMemo(() => selected.includes(id), [id, selected]);

  const toggleSelected = useCallback(() => {
    if (isSelected) {
      removeSelected(id);
    } else {
      addSelected(id);
    }
  }, [addSelected, id, isSelected, removeSelected]);

  return { selected, isSelected, toggleSelected };
};

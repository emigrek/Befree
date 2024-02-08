import { useCallback, useMemo } from 'react';

import { useRelapsesSelectionStore } from '@/store';

interface UseSelectedRelapsesProps {
  id: string;
}

export const useSelectedRelapses = ({ id }: UseSelectedRelapsesProps) => {
  const { selected, addSelected, removeSelected } = useRelapsesSelectionStore(
    state => ({
      selected: state.selected,
      addSelected: state.addSelected,
      removeSelected: state.removeSelected,
    }),
  );

  const isSelected = useMemo(() => selected.includes(id), [id, selected]);

  const toggleSelected = useCallback(() => {
    if (isSelected) {
      removeSelected(id);
      return;
    }

    addSelected(id);
  }, [addSelected, id, isSelected, removeSelected]);

  return { selected, isSelected, toggleSelected };
};

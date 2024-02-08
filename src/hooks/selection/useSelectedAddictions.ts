import { useCallback, useMemo } from 'react';

import { useAddictionsSelectionStore } from '@/store';

interface UseSelectedAddictionsProps {
  id: string;
}

export const useSelectedAddictions = ({ id }: UseSelectedAddictionsProps) => {
  const { selected, addSelected, removeSelected } = useAddictionsSelectionStore(
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

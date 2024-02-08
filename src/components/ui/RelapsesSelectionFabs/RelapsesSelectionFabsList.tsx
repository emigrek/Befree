import { FC } from 'react';

import { SelectionFab, SelectionFabType } from '@/components/ui/SelectionFab';
import { useRelapsesSelectionStore } from '@/store';

interface RelapsesSelectionFabsListProps {
  fabs: SelectionFabType[];
}

const RelapsesSelectionFabsList: FC<RelapsesSelectionFabsListProps> = ({
  fabs,
}) => {
  const selected = useRelapsesSelectionStore(state => state.selected);

  return fabs.map(fab => (
    <SelectionFab
      key={fab.id}
      selectionFab={fab}
      totalSelectionFabs={fabs.length}
      totalSelected={selected.length}
    />
  ));
};

export { RelapsesSelectionFabsList };

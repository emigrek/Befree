import { FC } from 'react';

import { SelectionFab, SelectionFabType } from '@/components/ui/SelectionFab';
import { useAddictionsSelectionStore } from '@/store';

interface AddictionsSelectionFabsListProps {
  fabs: SelectionFabType[];
}

const AddictionsSelectionFabsList: FC<AddictionsSelectionFabsListProps> = ({
  fabs,
}) => {
  const selected = useAddictionsSelectionStore(state => state.selected);

  return fabs.map(fab => (
    <SelectionFab
      key={fab.id}
      selectionFab={fab}
      totalSelectionFabs={fabs.length}
      totalSelected={selected.length}
    />
  ));
};

export { AddictionsSelectionFabsList };

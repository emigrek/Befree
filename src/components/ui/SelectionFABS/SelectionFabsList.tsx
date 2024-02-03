import React, { FC } from 'react';

import { SelectionFab } from './SelectionFab';
import { SelectionFab as SelectionFabType } from './useSelectionFabs';

interface SelectionFabsListProps {
  selectionFabs: SelectionFabType[];
}

const SelectionFabsList: FC<SelectionFabsListProps> = ({ selectionFabs }) => {
  return selectionFabs.map(item => (
    <SelectionFab
      key={item.id}
      selectionFab={item}
      totalSelectionFabs={selectionFabs.length}
    />
  ));
};

export { SelectionFabsList };

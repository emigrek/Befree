import React from 'react';

import { SelectionFabsList } from './SelectionFabsList';
import { useSelectionFabs } from './useSelectionFabs';

const SelectionFabs = () => {
  const selectionFabs = useSelectionFabs();
  return <SelectionFabsList selectionFabs={selectionFabs} />;
};

export { SelectionFabs };

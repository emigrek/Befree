import { FC } from 'react';

import { RelapsesSelectionFabsList } from './RelapsesSelectionFabsList';
import { useRelapsesSelectionFabs } from './useRelapsesSelectionFabs';

interface RelapsesSelectionFabsProps {
  addiction: Addiction;
}

const RelapsesSelectionFabs: FC<RelapsesSelectionFabsProps> = ({
  addiction,
}) => {
  const fabs = useRelapsesSelectionFabs({ addiction });
  return <RelapsesSelectionFabsList fabs={fabs} />;
};

export { RelapsesSelectionFabs };

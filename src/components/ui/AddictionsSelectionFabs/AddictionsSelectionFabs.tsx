import { AddictionsSelectionFabsList } from './AddictionsSelectionFabsList';
import { useAddictionsSelectionFabs } from './useAddictionsSelectionFabs';

const AddictionsSelectionFabs = () => {
  const fabs = useAddictionsSelectionFabs();
  return <AddictionsSelectionFabsList fabs={fabs} />;
};

export { AddictionsSelectionFabs };

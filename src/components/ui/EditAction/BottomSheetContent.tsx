import { FC } from 'react';

import { EditView } from './EditView';

import { Loading } from '@/components/screens';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import { AddictionStackRouteProp } from '@/navigation/types';

interface BottomSheetContentProps {
  route: AddictionStackRouteProp;
}

const BottomSheetContent: FC<BottomSheetContentProps> = ({ route }) => {
  const addiction = useAddiction({
    id: route.params.id,
  });

  if (!addiction) {
    return <Loading />;
  }

  return <EditView addiction={addiction} />;
};

export { BottomSheetContent };

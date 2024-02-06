import { FC } from 'react';
import { View } from 'react-native';

import { AddictionsList } from './AddictionsList';
import { Header } from './Header';

import { AddictionCreatorFab } from '@/components/ui/AddictionCreatorFab';
import { Commitment } from '@/components/ui/Commitment';
import { HiddenAddictionsAction } from '@/components/ui/HiddenAddictionsAction';
import { SelectionFabs } from '@/components/ui/SelectionFabs';
import { SortingAction } from '@/components/ui/SortingAction';
import { useAddictions } from '@/hooks/addiction/useAddictions';

interface AddictionsProps {
  hidden?: boolean;
}

const Addictions: FC<AddictionsProps> = ({ hidden }) => {
  const { addictions, addictionsLoading } = useAddictions({ hidden });

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <View style={{ flex: 1 }}>
          <Commitment />
        </View>
        <SortingAction />
        {!hidden && <HiddenAddictionsAction />}
      </Header>
      <AddictionsList addictions={addictions} loading={addictionsLoading} />
      <SelectionFabs />
      <AddictionCreatorFab hideAddiction={hidden} />
    </View>
  );
};

export { Addictions };

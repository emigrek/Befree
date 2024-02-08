import { FC } from 'react';
import { View } from 'react-native';

import { AddictionsList } from './AddictionsList';
import { Header } from './Header';

import { AddictionCreatorFab } from '@/components/ui/AddictionCreatorFab';
import { AddictionsSelectionFabs } from '@/components/ui/AddictionsSelectionFabs';
import { Commitment } from '@/components/ui/Commitment';
import { HiddenAddictionsAction } from '@/components/ui/HiddenAddictionsAction';
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
      <AddictionsSelectionFabs />
      <AddictionCreatorFab hideAddiction={hidden} />
    </View>
  );
};

export { Addictions };

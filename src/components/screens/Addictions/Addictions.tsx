import { FC } from 'react';
import { View } from 'react-native';

import { AddictionsList } from './AddictionsList';
import { Header } from './Header';

import { AddictionAddFAB } from '@/components/ui/AddictionAddFAB';
import { Commitment } from '@/components/ui/Commitment';
import { HiddenAddictionsAction } from '@/components/ui/HiddenAddictionsAction';
import { SelectionFABs } from '@/components/ui/SelectionFABS';
import { SortingAction } from '@/components/ui/SortingAction';
import { useAuthStore, useGlobalStore } from '@/store';

interface AddictionsProps {
  hidden?: boolean;
}

const Addictions: FC<AddictionsProps> = ({ hidden }) => {
  const user = useAuthStore(state => state.user);
  const { addictions, hiddenAddictions, loading } = useGlobalStore(state => ({
    addictions: state.addictions,
    hiddenAddictions: state.hiddenAddictions,
    loading: state.addictionsLoading,
  }));
  const items = hidden ? hiddenAddictions : addictions;

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <View style={{ flex: 1 }}>
          <Commitment />
        </View>
        <SortingAction />
        {!hidden && <HiddenAddictionsAction />}
      </Header>
      <AddictionsList addictions={items} loading={loading} />
      {user && <SelectionFABs user={user} addictions={items} />}
      {!hidden && <AddictionAddFAB />}
    </View>
  );
};

const HiddenAddictions = () => <Addictions hidden />;

export { Addictions, HiddenAddictions };

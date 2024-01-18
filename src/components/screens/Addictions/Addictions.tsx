import { FC, useCallback } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

import { Addiction } from './Addiction';
import { Empty } from './Empty';
import { Header } from './Header';

import { Loading } from '@/components/screens/Loading';
import { ADDICTION_ITEM_HEIGHT } from '@/components/ui/Addiction/style';
import { AddictionAddFAB } from '@/components/ui/AddictionAddFAB';
import { Commitment } from '@/components/ui/Commitment';
import { HiddenAddictionsAction } from '@/components/ui/HiddenAddictionsAction';
import { SelectionFABs } from '@/components/ui/SelectionFABS';
import { SortingAction } from '@/components/ui/SortingAction';
import { useAddictions } from '@/hooks/addiction/useAddictions';
import { useAuthStore } from '@/store';

interface AddictionsProps {
  hidden?: boolean;
}

const Addictions: FC<AddictionsProps> = ({ hidden }) => {
  const user = useAuthStore(state => state.user);
  const { sortedAddictions, sortedHiddenAddictions, loading } = useAddictions();
  const addictions = hidden ? sortedHiddenAddictions : sortedAddictions;

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <View style={{ flex: 1 }}>
          <Commitment />
        </View>
        <SortingAction />
        {!hidden && <HiddenAddictionsAction />}
      </Header>
      <AddictionsFlatList addictions={addictions} loading={loading} />
      {user && <SelectionFABs user={user} addictions={addictions} />}
      {!hidden && <AddictionAddFAB />}
    </View>
  );
};

interface AddictionsFlatListProps {
  addictions: Addiction[];
  loading: boolean;
}

const AddictionsFlatList: FC<AddictionsFlatListProps> = ({
  addictions,
  loading,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: Addiction }) => <Addiction addiction={item} />,
    [],
  );

  const renderDivider = useCallback(() => <Divider />, []);

  if (loading) {
    return <Loading />;
  }

  if (!addictions.length) {
    return <Empty />;
  }

  return (
    <FlatList
      data={addictions}
      getItemLayout={(data, index) => ({
        length: ADDICTION_ITEM_HEIGHT,
        offset: ADDICTION_ITEM_HEIGHT * index,
        index,
      })}
      ItemSeparatorComponent={renderDivider}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const AddictionsScreen = () => <Addictions />;

export { Addictions, AddictionsScreen };

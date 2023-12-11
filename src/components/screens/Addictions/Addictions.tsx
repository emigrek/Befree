import { useNavigation } from '@react-navigation/native';
import { FC, useCallback, useLayoutEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

import { Addiction } from './Addiction';
import { Empty } from './Empty';
import { SelectionFABs } from './SelectionFABs';

import { Loading } from '@/components/screens/Loading';
import { ADDICTION_ITEM_HEIGHT } from '@/components/ui/Addiction/style';
import { SortingAction } from '@/components/ui/SortingAction';
import { useAddictions } from '@/hooks/addiction/useAddictions';
import { BottomTabsStackNavigationProp } from '@/navigation/types';
import { useAuthStore } from '@/store';

const Addictions: FC = () => {
  const navigation = useNavigation<BottomTabsStackNavigationProp>();
  const user = useAuthStore(state => state.user);
  const { sortedAddictions, loading } = useAddictions({
    user: user!,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <SortingAction />,
    });
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: Addiction }) => <Addiction addiction={item} />,
    [],
  );

  const renderDivider = useCallback(() => <Divider />, []);

  if (loading) {
    return <Loading />;
  }

  if (!sortedAddictions.length) {
    return <Empty />;
  }

  return (
    <>
      <FlatList
        data={sortedAddictions}
        getItemLayout={(data, index) => ({
          length: ADDICTION_ITEM_HEIGHT,
          offset: ADDICTION_ITEM_HEIGHT * index,
          index,
        })}
        ItemSeparatorComponent={renderDivider}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {user && <SelectionFABs user={user} addictions={sortedAddictions} />}
    </>
  );
};

export { Addictions };

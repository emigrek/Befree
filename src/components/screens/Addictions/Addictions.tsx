import { FC, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

import { Addiction } from './Addiction';
import { Empty } from './Empty';
import { SelectionFABs } from './SelectionFABs';

import { Loading } from '@/components/screens/Loading';
import { ADDICTION_ITEM_HEIGHT } from '@/components/ui/Addiction/style';
import { useAddictions } from '@/hooks/addiction/useAddictions';
import { useAuthStore } from '@/store';

const Addictions: FC = () => {
  const user = useAuthStore(state => state.user);
  const { sortedAddictions, loading } = useAddictions({
    user: user!,
  });

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

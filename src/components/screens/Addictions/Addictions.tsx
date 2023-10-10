import { FC, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

import { Empty } from './Empty';

import { Loading } from '@/components/screens/Loading';
import { Addiction } from '@/components/ui/Addiction';
import { ITEM_HEIGHT } from '@/components/ui/Addiction/Addiction';
import { useAddictions } from '@/hooks/addiction/useAddictions';
import { useAuthStore } from '@/store';

const Addictions: FC = () => {
  const user = useAuthStore(state => state.user);
  const { addictions, loading } = useAddictions({
    user: user!,
  });

  const renderItem = useCallback(
    ({ item }: { item: Addiction }) => <Addiction {...item} />,
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
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      ItemSeparatorComponent={renderDivider}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export { Addictions };

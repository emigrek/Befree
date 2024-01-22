import { FC, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

import { Addiction } from './Addiction';
import { Empty } from './Empty';

import { Loading } from '@/components/screens/Loading';
import { ADDICTION_ITEM_HEIGHT } from '@/components/ui/Addiction/style';

interface AddictionsListProps {
  addictions: Addiction[];
  loading: boolean;
}

const AddictionsList: FC<AddictionsListProps> = ({ addictions, loading }) => {
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

export { AddictionsList };

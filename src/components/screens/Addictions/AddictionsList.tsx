import { FC, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

import { Addiction } from './Addiction';

import { Launching } from '@/components/illustrations';
import { LoadingScreen } from '@/components/screens/Loading';
import { ADDICTION_ITEM_HEIGHT } from '@/components/ui/Addiction/style';
import { Empty } from '@/components/ui/Empty';
import i18n from '@/i18n';
import { Addiction as AddictionType } from '@/structures';

interface AddictionsListProps {
  addictions: AddictionType[];
  loading: boolean;
}

const AddictionsList: FC<AddictionsListProps> = ({ addictions, loading }) => {
  const renderItem = useCallback(
    ({ item }: { item: AddictionType }) => <Addiction addiction={item} />,
    [],
  );

  const renderDivider = useCallback(() => <Divider />, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!addictions.length) {
    return (
      <Empty
        illustration={Launching}
        message={i18n.t(['screens', 'addictions', 'empty'])}
      />
    );
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

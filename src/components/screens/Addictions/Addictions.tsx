import { FC, memo } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

import { Empty } from './Empty';

import { Loading } from '@/components/screens/Loading';
import { Addiction } from '@/components/ui/Addiction';
import { useAddictions } from '@/hooks/addiction/useAddictions';
import { useAuthStore } from '@/store';

const MemoAddiction = memo(Addiction);

const Addictions: FC = () => {
  const user = useAuthStore(state => state.user);

  const { addictions, loading } = useAddictions({
    user: user!,
  });

  if (loading) {
    return <Loading />;
  }

  if (!addictions.length) {
    return <Empty />;
  }

  return (
    <FlatList
      data={addictions}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => <MemoAddiction {...item} />}
      keyExtractor={item => item.id}
    />
  );
};

export { Addictions };

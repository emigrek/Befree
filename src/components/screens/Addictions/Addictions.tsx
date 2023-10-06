import { FC } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

import { Empty } from './Empty';

import { Loading } from '@/components/screens/Loading';
import { Addiction } from '@/components/ui/Addiction';
import { style } from '@/components/ui/Addiction/style';
import { useAddictions } from '@/services/firestore';
import { useAuthStore } from '@/store';

const Addictions: FC = () => {
  const user = useAuthStore(state => state.user);
  const { addictions, loading } = useAddictions(user);

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
      style={style.flatlist}
      renderItem={({ item }) => <Addiction {...item} />}
      keyExtractor={item => item.id}
    />
  );
};

export { Addictions };

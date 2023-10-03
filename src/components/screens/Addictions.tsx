import { FC } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { Addiction } from '../ui/Addiction';
import { style } from '../ui/Addiction/style';

import { useAddictions } from '@/services/firestore';
import { useAuthStore } from '@/store';

const Addictions: FC = () => {
  const user = useAuthStore(state => state.user);
  const { addictions } = useAddictions(user);

  return (
    <FlatList
      data={addictions}
      style={style.flatlist}
      renderItem={({ item }) => <Addiction {...item} />}
      keyExtractor={item => item.id}
    />
  );
};

export { Addictions };

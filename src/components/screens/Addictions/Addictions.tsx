import { FC, useCallback, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useTimer } from 'react-use-precision-timer';

import { Empty } from './Empty';

import { Loading } from '@/components/screens/Loading';
import { Addiction } from '@/components/ui/Addiction';
import { style } from '@/components/ui/Addiction/style';
import { useAddictions } from '@/services/firestore';
import { useAuthStore } from '@/store';

const Addictions: FC = () => {
  const user = useAuthStore(state => state.user);
  const { addictions, loading } = useAddictions(user);
  const [date, setDate] = useState(new Date());

  useTimer(
    { delay: 1000, startImmediately: true, fireOnStart: true },
    useCallback(() => {
      setDate(new Date());
    }, []),
  );

  if (loading) {
    return <Loading />;
  }

  if (!addictions.length) {
    return <Empty />;
  }

  return (
    <FlatList
      extraData={date}
      data={addictions}
      style={style.flatlist}
      renderItem={({ item }) => <Addiction {...item} />}
      keyExtractor={item => item.id}
    />
  );
};

export { Addictions };

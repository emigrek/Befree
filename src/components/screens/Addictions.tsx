import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

import { Screen } from '@/components/ui/Screen';
import { useAddictions } from '@/services/firestore';
import { useAuthStore } from '@/store';

const Addictions: FC = () => {
  const user = useAuthStore(state => state.user);
  const { addictions } = useAddictions(user);

  return (
    <Screen style={style.screen}>
      <FlatList
        data={addictions}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={item => item.id}
      />
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});

export { Addictions };

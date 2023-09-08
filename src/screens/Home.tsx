import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

import { Screen } from '@/components/Screen';
import { useAuthStore } from '@/store';

const Home: FC = () => {
  const { user } = useAuthStore(state => ({ user: state.user }));

  if (!user) return null;

  return (
    <Screen style={style.screen}>
      {user.photoURL ? (
        <Avatar.Image
          size={100}
          source={{
            uri: user?.photoURL,
          }}
        />
      ) : (
        <Avatar.Text size={100} label={user.displayName ?? 'XD'} />
      )}
      <Text variant={'titleLarge'}>{user.displayName}</Text>
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export { Home };

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { Screen } from '@/components/Screen';
import { AuthenticationProps } from '@/navigation';
import { RootStackParamList } from '@/navigation/types';

const Authentication: FC<AuthenticationProps> = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Screen style={style.screen}>
      <Button
        mode={'contained'}
        onPress={() =>
          navigate('Main', {
            screen: 'Dashboard',
          })
        }
      >
        Sign in
      </Button>
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

export { Authentication };

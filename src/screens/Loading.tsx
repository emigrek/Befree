import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native-paper';

import { Screen } from '@/components/Screen';

interface LoadingProps extends ActivityIndicatorProps {}

const Loading: FC<LoadingProps> = props => {
  return (
    <Screen style={style.screen}>
      <ActivityIndicator {...props} />
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Loading };

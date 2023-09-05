import { FC } from 'react';
import { StyleSheet } from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

import { useAppTheme } from '@/theme';

interface ScreenProps extends SafeAreaViewProps {}

const Screen: FC<ScreenProps> = ({ style, ...props }) => {
  const { colors } = useAppTheme();

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: colors.background }, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export { Screen };

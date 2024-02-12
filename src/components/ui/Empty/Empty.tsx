import { useHeaderHeight } from '@react-navigation/elements';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { Screen } from '@/components/ui/Screen';
import { useTheme } from '@/theme';

interface EmptyProps {
  illustration: FC;
  message: string;
}

const Empty: FC<EmptyProps> = ({ illustration: Illustration, message }) => {
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();

  return (
    <Screen style={[style.screen, { marginBottom: headerHeight }]}>
      <Illustration />
      <Text
        variant="bodyMedium"
        style={[style.text, { color: colors.outline }]}
      >
        {message}
      </Text>
    </Screen>
  );
};

export { Empty };

const style = StyleSheet.create({
  screen: {
    paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
});

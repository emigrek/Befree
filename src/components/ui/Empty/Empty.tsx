import { useHeaderHeight } from '@react-navigation/elements';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { Screen } from '@/components/ui/Screen';
import { useTheme } from '@/theme';

interface EmptyProps {
  illustration: FC;
  message: string;
  action?: FC;
}

const Empty: FC<EmptyProps> = ({
  illustration: Illustration,
  message,
  action: Action,
}) => {
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
      {Action && <Action />}
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

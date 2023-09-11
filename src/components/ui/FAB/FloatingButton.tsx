import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { FAB as PaperFAB, FABProps as PaperFABProps } from 'react-native-paper';

import { useTheme } from '@/theme';

type FABProps = PaperFABProps;

const FAB: FC<FABProps> = ({ style, ...props }) => {
  const { colors } = useTheme();

  return (
    <PaperFAB
      color={colors.onSurface}
      style={[
        styles.fab,
        {
          backgroundColor: colors.primary,
        },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 15,
    bottom: 75,
  },
});

export { FAB };

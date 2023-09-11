import React from 'react';
import { Text } from 'react-native-paper';

import { useTheme } from '@/theme';

const Logo = () => {
  const { colors } = useTheme();

  return (
    <Text
      variant={'titleLarge'}
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.primary,
      }}
    >
      Befree
    </Text>
  );
};

export { Logo };

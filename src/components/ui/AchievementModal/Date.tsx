import React, { FC } from 'react';
import { Text, TextProps } from 'react-native-paper';

import { useTheme } from '@/theme';

interface DateProps extends Omit<TextProps<'string'>, 'variant'> {}

const Date: FC<DateProps> = ({ style, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        style,
        {
          color: colors.outline,
        },
      ]}
      variant={'bodySmall'}
      {...props}
    />
  );
};

export { Date };

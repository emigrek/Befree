import { FC } from 'react';
import { Text, TextProps } from 'react-native-paper';

import { useTheme } from '@/theme';

interface SubtitleProps extends TextProps<string> {}

const Subtitle: FC<SubtitleProps> = ({ style, ...props }) => {
  const { colors } = useTheme();

  return (
    <Text
      style={[
        style,
        {
          color: colors.onSurfaceVariant,
        },
      ]}
      {...props}
    />
  );
};

export { Subtitle };

import { FC } from 'react';
import { Card, CardTitleProps } from 'react-native-paper';

import { useTheme } from '@/theme';

const Title: FC<CardTitleProps> = ({ subtitleStyle, ...props }) => {
  const { colors } = useTheme();
  return (
    <Card.Title
      subtitleStyle={[
        subtitleStyle,
        {
          color: colors.outline,
        },
      ]}
      {...props}
    />
  );
};

export { Title };

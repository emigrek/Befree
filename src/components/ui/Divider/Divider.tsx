import { FC } from 'react';
import {
  Divider as PrimitiveDivider,
  DividerProps as PrimitiveDividerProps,
} from 'react-native-paper';

import { useTheme } from '@/theme';

type DividerProps = PrimitiveDividerProps;

const Divider: FC<DividerProps> = ({ style, ...props }) => {
  const theme = useTheme();
  return (
    <PrimitiveDivider
      style={[
        style,
        {
          backgroundColor: theme.colors.border,
        },
      ]}
      {...props}
    />
  );
};

export { Divider };

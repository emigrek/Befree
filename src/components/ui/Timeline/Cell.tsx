import { forwardRef } from 'react';
import { View, ViewProps } from 'react-native';

type CellProps = ViewProps;

const Cell = forwardRef<View, CellProps>((props, ref) => {
  return <View ref={ref} {...props} />;
});

export { Cell };

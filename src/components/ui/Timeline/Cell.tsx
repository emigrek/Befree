import { forwardRef } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { useTimelineContext } from './context';

type CellProps = ViewProps;

const Cell = forwardRef<View, CellProps>((props, ref) => {
  const { cellSize, cellStyle, cellMargin } = useTimelineContext();

  return (
    <View
      ref={ref}
      style={[
        cellStyle,
        style.cell,
        { width: cellSize, height: cellSize, margin: cellMargin },
      ]}
      {...props}
    />
  );
});

const style = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255, 0.1 )',
    borderRadius: 2,
  },
});

export { Cell };

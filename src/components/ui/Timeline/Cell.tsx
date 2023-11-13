import { forwardRef } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { useTimelineContext } from './context';

interface CellProps extends ViewProps {
  index: number;
}

const Cell = forwardRef<View, CellProps>(
  ({ index, style: cellStyle, ...props }, ref) => {
    const { cellSize, cellMargin } = useTimelineContext();

    // const day = useMemo(() => {
    //   const [start] = range;
    //   return addDays(start, index);
    // }, [index, range]);

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
  },
);

const style = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255, 0.1 )',
    borderRadius: 2,
  },
});

export { Cell };

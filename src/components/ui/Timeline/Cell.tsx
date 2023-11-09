import { forwardRef } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface CellProps extends ViewProps {
  size?: number;
  margin?: number;
}

const Cell = forwardRef<View, CellProps>(
  ({ size = 10, margin = 1, style: cellStyle, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          cellStyle,
          style.cell,
          { width: size, height: size },
          { margin },
        ]}
        {...props}
      />
    );
  },
);

const style = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255, 0.2)',
    borderRadius: 2,
  },
});

export { Cell };

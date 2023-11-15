import { isSameDay } from 'date-fns';
import { forwardRef, useMemo } from 'react';
import { View, ViewProps } from 'react-native';

import { useTimelineContext } from './context';

import { useTheme } from '@/theme';

interface CellProps extends ViewProps {
  day: Date;
}

const Cell = forwardRef<View, CellProps>(
  ({ day, style: cellStyle, ...props }, ref) => {
    const { cellSize, cellMargin, data, dataMaxCount } = useTimelineContext();
    const { colors } = useTheme();

    const backgroundColor = useMemo(() => {
      const matching = data.filter(date => isSameDay(day, date));
      const alpha = matching.length / (dataMaxCount || 0);

      const alphaHex = Math.round(alpha * 255).toString(16);

      return `${colors.primary}${alphaHex.padStart(2, '0')}`;
    }, [data, day, colors, dataMaxCount]);

    return (
      <View
        ref={ref}
        style={[
          cellStyle,
          {
            width: cellSize,
            height: cellSize,
            margin: cellMargin,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 3,
            backgroundColor,
          },
        ]}
        {...props}
      />
    );
  },
);

export { Cell };

import { HorizontalFlatList } from '@idiosync/horizontal-flatlist';
import { eachDayOfInterval, format } from 'date-fns';
import { FC, useMemo } from 'react';
import { ViewProps } from 'react-native';

import { Cell as CellItem } from './Cell';
import { useTimelineContext } from './context';
import { Cell } from './types';

import { useTheme } from '@/theme';

interface CellsProps {
  cellStyle?: ViewProps['style'];
}

const Cells: FC<CellsProps> = ({ cellStyle }) => {
  const { colors } = useTheme();
  const { range, colorMap, cellSize, cellMargin } = useTimelineContext();
  const [start, end] = range;

  const data = useMemo(() => {
    const days = eachDayOfInterval({
      start,
      end,
    });

    const cells = days.map(day => {
      const key = format(day, 'yyyy-MM-dd');
      return {
        day,
        backgroundColor: colorMap
          ? colorMap[key] || 'transparent'
          : 'transparent',
      };
    });

    return cells;
  }, [start, end, colorMap]);

  const renderItem = useMemo(
    () =>
      ({ item, row, col }: { item: Cell; row: number; col: number }) => {
        return (
          <CellItem
            style={[
              cellStyle,
              {
                width: cellSize,
                height: cellSize,
                margin: cellMargin,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 3,
                backgroundColor: item.backgroundColor,
              },
            ]}
          />
        );
      },
    [cellStyle, colors, cellMargin, cellSize],
  );

  const keyExtractor = (item: Cell, row: number, col: number) => {
    return item.day.toString();
  };

  return (
    <HorizontalFlatList
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      numRows={7}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export { Cells };

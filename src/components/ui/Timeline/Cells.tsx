import { HorizontalFlatList } from '@idiosync/horizontal-flatlist';
import { FC, useMemo } from 'react';
import { View, ViewProps } from 'react-native';

import { useTimelineContext } from './context';
import { Cell } from './types';

import { useTheme } from '@/theme';

interface CellsProps {
  cellStyle?: ViewProps['style'];
}

const Cells: FC<CellsProps> = ({ cellStyle }) => {
  const { colors } = useTheme();
  const { cellsData, cellSize, cellMargin } = useTimelineContext();

  const renderItem = useMemo(
    () =>
      ({ item, row, col }: { item: Cell; row: number; col: number }) => {
        return (
          <View
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
      data={cellsData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export { Cells };

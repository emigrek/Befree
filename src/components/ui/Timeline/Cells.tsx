import { FC, useMemo } from 'react';
import { View, ViewProps } from 'react-native';

import { useTimelineContext } from './context';
import { Cell } from './types';

import { HFlatList } from '@/components/ui/HFlatList';
import { useTheme } from '@/theme';

interface CellsProps {
  cellStyle?: ViewProps['style'];
}

const Cells: FC<CellsProps> = ({ cellStyle }) => {
  const { colors } = useTheme();
  const { cellsData, cellSize, cellMargin, mirrored } = useTimelineContext();

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
                position: 'relative',
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 3,
                overflow: 'hidden',
              },
              mirrored && {
                justifyContent: 'flex-end',
              },
            ]}
          >
            <View
              style={{
                width: '100%',
                height: item.dayProgress
                  ? `${item.dayProgress * 100}%`
                  : '100%',
                backgroundColor: item.backgroundColor,
              }}
            />
          </View>
        );
      },
    [cellStyle, colors, cellMargin, cellSize, mirrored],
  );

  const keyExtractor = (item: Cell, row: number, col: number) => {
    return item.day.toString();
  };

  return (
    <HFlatList
      scrollEnabled={false}
      data={cellsData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numRows={7}
      onEndReached={() => console.log('end')}
      getItemLayout={(data, index) => ({
        length: cellSize + cellMargin * 2,
        offset: (cellSize + cellMargin * 2) * index,
        index,
      })}
    />
  );
};

export { Cells };

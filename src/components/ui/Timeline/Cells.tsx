import { FC, useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';

import { useTimelineContext } from './context';
import { Cell } from './types';

import { HFlatList } from '@/components/ui/HFlatList';
import { useTheme } from '@/theme';

interface CellsProps {
  cellStyle?: ViewProps['style'];
}

const Cells: FC<CellsProps> = ({ cellStyle }) => {
  const { colors } = useTheme();
  const { cellsData, cellSize, cellMargin, mirrored, invertColor } =
    useTimelineContext();

  const renderItem = useMemo(
    () =>
      ({ item }: { item: Cell; row: number; col: number }) => {
        return (
          <View
            style={[
              cellStyle,
              {
                width: cellSize,
                height: cellSize,
                margin: cellMargin,
                position: 'relative',
                overflow: 'hidden',
              },
              {
                borderWidth: 1,
                borderColor: colors.outlineVariant,
                borderRadius: 3,
              },
              mirrored && {
                justifyContent: 'flex-end',
              },
            ]}
          >
            {item.frequency !== 0 && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 1,
                  right: 2,
                  zIndex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: 'bold',
                    color: invertColor
                      ? colors.onPrimary
                      : colors.onErrorContainer,
                    textAlign: 'center',
                  }}
                >
                  {item.frequency}
                </Text>
              </View>
            )}
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
      getItemLayout={(data, index) => ({
        length: cellSize + cellMargin * 2,
        offset: (cellSize + cellMargin * 2) * index,
        index,
      })}
    />
  );
};

export { Cells };

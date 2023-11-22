import { format } from 'date-fns';
import { FC, useMemo } from 'react';
import { FlatList, StyleSheet, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';

import { useTimelineContext } from './context';

import { useTheme } from '@/theme';

interface WeeksProps {
  weekStyle?: ViewProps['style'];
}

const Weeks: FC<WeeksProps> = ({ weekStyle }) => {
  const { colors } = useTheme();
  const { cellSize, cellMargin, cellsData, fontSize } = useTimelineContext();

  const weeks = useMemo(() => {
    return cellsData
      .filter((_, index) => {
        return index % 7 === 0;
      })
      .map(cell => cell.day);
  }, [cellsData]);

  const renderItem = useMemo(
    () =>
      ({ item }: { item: Date; index: number }) => {
        return (
          <Text
            style={[
              style.week,
              weekStyle,
              {
                width: cellSize,
                height: cellSize,
                margin: cellMargin,
                color: colors.onSurfaceVariant,
                fontSize,
              },
            ]}
          >
            {item.getDate() <= 7 ? format(item, 'MMM') : ''}
          </Text>
        );
      },
    [weekStyle, cellSize, cellMargin, fontSize, colors.onSurfaceVariant],
  );

  const keyExtractor = (item: Date, index: number) => {
    return index.toString();
  };

  return (
    <FlatList
      scrollEnabled={false}
      data={weeks}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  );
};

const style = StyleSheet.create({
  week: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 2,
    verticalAlign: 'middle',
  },
});

export { Weeks };

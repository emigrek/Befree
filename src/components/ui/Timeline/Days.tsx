import { eachDayOfInterval, format } from 'date-fns';
import { FC, useMemo } from 'react';
import { FlatList, StyleSheet, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';

import { useTimelineContext } from './context';

interface DaysProps {
  dayStyle?: ViewProps['style'];
}

const Days: FC<DaysProps> = ({ dayStyle }) => {
  const { cellSize, cellMargin } = useTimelineContext();

  const daysOfWeek = useMemo(() => {
    return eachDayOfInterval({
      start: new Date(2021, 0, 3),
      end: new Date(2021, 0, 9),
    });
  }, []);

  const shortWeekDays = useMemo(() => {
    return daysOfWeek.map(day => format(day, 'EEE'));
  }, [daysOfWeek]);

  const renderItem = useMemo(
    () =>
      ({ item, index }: { item: string; index: number }) => {
        return (
          <Text
            style={[
              style.day,
              dayStyle,
              {
                height: cellSize,
                margin: cellMargin,
              },
            ]}
          >
            {[1, 3, 5].includes(index) ? item : ''}
          </Text>
        );
      },
    [dayStyle, cellMargin, cellSize],
  );

  const keyExtractor = (item: string, index: number) => {
    return item;
  };

  return (
    <FlatList
      contentContainerStyle={[
        {
          marginTop: cellSize + 2 * cellMargin,
        },
      ]}
      scrollEnabled={false}
      data={shortWeekDays}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

const style = StyleSheet.create({
  days: {},
  day: {
    fontSize: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 2,
    verticalAlign: 'middle',
  },
});

export { Days };

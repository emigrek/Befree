import { eachDayOfInterval, format } from 'date-fns';
import { forwardRef, useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';

import { useTimelineContext } from './context';

interface DaysProps extends ViewProps {
  dayStyle?: ViewProps['style'];
}

const Days = forwardRef<View, DaysProps>(
  ({ dayStyle, style: daysStyle, ...props }, ref) => {
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

    return (
      <View
        ref={ref}
        style={[
          style.days,
          daysStyle,
          { marginTop: cellSize + 2 * cellMargin },
        ]}
        {...props}
      >
        {shortWeekDays.map((day, index) => {
          return (
            <Text
              key={index}
              style={[
                style.day,
                dayStyle,
                {
                  height: cellSize,
                  margin: cellMargin,
                },
              ]}
            >
              {[1, 3, 5].includes(index) ? day : ''}
            </Text>
          );
        })}
      </View>
    );
  },
);

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

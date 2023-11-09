import { eachDayOfInterval, format } from 'date-fns';
import { forwardRef } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';

interface DaysProps extends ViewProps {
  size?: number;
  margin?: number;
}

const Days = forwardRef<View, DaysProps>(
  ({ size = 10, margin = 1, style: daysStyle, ...props }, ref) => {
    const daysOfWeek = eachDayOfInterval({
      start: new Date(2021, 0, 3),
      end: new Date(2021, 0, 9),
    });

    const shortWeekDays = daysOfWeek.map(day => format(day, 'EEE'));

    return (
      <View ref={ref} style={[daysStyle, style.days]} {...props}>
        {shortWeekDays.map((day, index) => {
          return (
            <Text
              key={index}
              style={[
                style.day,
                {
                  height: size,
                  margin,
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

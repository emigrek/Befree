import { add, format } from 'date-fns';
import { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native-paper';

import { useTimelineContext } from './context';

interface MonthProps extends Omit<TextProps<string>, 'children'> {
  index: number;
}

const Month: FC<MonthProps> = ({ index, style: monthStyle, ...props }) => {
  const { range, cellSize, cellMargin } = useTimelineContext();

  const start = useMemo(() => {
    return range[0];
  }, [range]);

  const month = useMemo(() => {
    return add(start, { weeks: index });
  }, [index, start]);

  const monthName = useMemo(() => {
    return format(month, 'MMM');
  }, [month]);

  return (
    <Text
      style={[
        style.month,
        monthStyle,
        {
          width: cellSize,
          height: cellSize,
          margin: cellMargin,
        },
      ]}
      {...props}
    >
      {monthName}
    </Text>
  );
};

const style = StyleSheet.create({
  month: {
    textAlign: 'center',
    fontSize: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 2,
    verticalAlign: 'middle',
  },
});

export { Month };

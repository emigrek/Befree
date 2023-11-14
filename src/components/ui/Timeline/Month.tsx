import { format } from 'date-fns';
import { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native-paper';

import { useTimelineContext } from './context';

interface MonthProps extends Omit<TextProps<string>, 'children'> {
  month: Date;
}

const Month: FC<MonthProps> = ({ month, style: monthStyle, ...props }) => {
  const { cellSize, cellMargin } = useTimelineContext();

  const monthName = useMemo(() => {
    const isFirstWeekOfMonth = month.getDate() <= 7;

    if (isFirstWeekOfMonth) {
      return format(month, 'MMM');
    }

    return '';
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

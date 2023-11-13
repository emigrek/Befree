import { differenceInDays } from 'date-fns';
import { forwardRef, useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { Month } from './Month';
import { useTimelineContext } from './context';

interface MonthsProps extends ViewProps {
  monthStyle?: ViewProps['style'];
}

const Months = forwardRef<View, MonthsProps>(
  ({ monthStyle, style: monthsStyle, ...props }, ref) => {
    const { range } = useTimelineContext();

    const months = useMemo(() => {
      const [start, end] = range;
      const days = differenceInDays(end, start);
      return [...Array(Math.floor(days / 7))];
    }, [range]);

    return (
      <View ref={ref} style={[style.months, monthsStyle]} {...props}>
        {months.map((_, index) => (
          <Month key={index} index={index} style={monthStyle} />
        ))}
      </View>
    );
  },
);

const style = StyleSheet.create({
  months: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export { Months };

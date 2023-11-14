import { differenceInDays } from 'date-fns';
import { FC, useMemo } from 'react';
import { FlatList, ViewProps } from 'react-native';

import { Month } from './Month';
import { useTimelineContext } from './context';

interface MonthsProps {
  monthStyle?: ViewProps['style'];
}

const Months: FC<MonthsProps> = ({ monthStyle }) => {
  const { range } = useTimelineContext();

  const months = useMemo(() => {
    const [start, end] = range;
    const days = differenceInDays(end, start);
    return [...Array(Math.floor(days / 7))];
  }, [range]);

  return (
    <FlatList
      scrollEnabled={false}
      data={months}
      renderItem={({ index }) => <Month style={monthStyle} index={index} />}
      keyExtractor={(_, index) => index.toString()}
      horizontal
    />
  );
};

export { Months };

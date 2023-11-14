import { eachWeekOfInterval } from 'date-fns';
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

    return eachWeekOfInterval({
      start,
      end,
    });
  }, [range]);

  const renderItem = useMemo(
    () =>
      ({ item }: { item: Date; index: number }) => {
        return <Month month={item} style={monthStyle} />;
      },
    [monthStyle],
  );

  const keyExtractor = (item: Date, index: number) => {
    return index.toString();
  };

  return (
    <FlatList
      scrollEnabled={false}
      data={months}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
    />
  );
};

export { Months };

import { HorizontalFlatList } from '@idiosync/horizontal-flatlist';
import { eachDayOfInterval } from 'date-fns';
import { FC, useMemo } from 'react';
import { ViewProps } from 'react-native';

import { Cell as CellItem } from './Cell';
import { useTimelineContext } from './context';
import { Cell } from './types';

interface CellsProps {
  cellStyle?: ViewProps['style'];
}

const Cells: FC<CellsProps> = ({ cellStyle }) => {
  const { range } = useTimelineContext();
  const [start, end] = range;

  const data = useMemo(() => {
    return eachDayOfInterval({
      start,
      end,
    }).map((day, index) => {
      return {
        index,
        day,
      };
    });
  }, [start, end]);

  const renderItem = useMemo(
    () =>
      ({ item, row, col }: { item: Cell; row: number; col: number }) => {
        return <CellItem day={item.day} style={cellStyle} />;
      },
    [cellStyle],
  );

  const keyExtractor = (item: Cell, row: number, col: number) => {
    return item.day.toString();
  };

  return (
    <HorizontalFlatList
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      numRows={7}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export { Cells };

import { HorizontalFlatList } from '@idiosync/horizontal-flatlist';
import { differenceInDays } from 'date-fns';
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

  const days = useMemo(() => {
    return differenceInDays(range[1], range[0]);
  }, [range]);

  const data = useMemo(() => {
    return [...Array(days)].map((_, index) => ({
      index,
    }));
  }, [days]);

  const keyExtractor = (item: Cell, row: number, col: number) => {
    return item.index.toString();
  };

  return (
    <HorizontalFlatList
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      numRows={7}
      data={data}
      renderItem={({ item }) => (
        <CellItem style={cellStyle} index={item.index} />
      )}
      keyExtractor={keyExtractor}
    />
  );
};

export { Cells };

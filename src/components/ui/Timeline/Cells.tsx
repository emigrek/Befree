import { differenceInDays } from 'date-fns';
import { FC, useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { Cell } from './Cell';
import { useTimelineContext } from './context';

interface CellsProps extends ViewProps {
  cellStyle?: ViewProps['style'];
}

const Cells: FC<CellsProps> = ({
  children,
  cellStyle,
  style: cellsStyle,
  ...props
}) => {
  const { range } = useTimelineContext();

  const days = useMemo(() => {
    return differenceInDays(range[1], range[0]);
  }, [range]);

  return (
    <View style={[cellsStyle, style.cells]} {...props}>
      {[...Array(days)].map((_, index) => {
        return <Cell key={index} index={index} style={cellStyle} />;
      })}
    </View>
  );
};

const style = StyleSheet.create({
  cells: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});

export { Cells };

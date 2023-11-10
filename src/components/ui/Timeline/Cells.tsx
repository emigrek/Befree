import { differenceInDays } from 'date-fns';
import { FC } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';

import { Cell } from './Cell';
import { useTimelineContext } from './context';

type CellsProps = ScrollViewProps;

const Cells: FC<CellsProps> = ({ children, style: cellsStyle, ...props }) => {
  const { range } = useTimelineContext();

  const days = differenceInDays(range[1], range[0]);

  return (
    <ScrollView horizontal {...props}>
      <View style={[cellsStyle, style.cells]}>
        {[...Array(days)].map((_, index) => {
          return <Cell key={index} />;
        })}
      </View>
    </ScrollView>
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

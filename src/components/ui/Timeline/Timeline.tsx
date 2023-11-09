import { differenceInDays } from 'date-fns';
import React, { forwardRef } from 'react';
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native';

import { Cell } from './Cell';
import { Days } from './Days';

interface TimelineProps extends ViewProps {
  range: [Date, Date];
  cellSize?: number;
  cellMargin?: number;
  cellsStyle?: ViewProps['style'];
  daysStyle?: ViewProps['style'];
  monthsStyle?: ViewProps['style'];
}

const Timeline = forwardRef<View, TimelineProps>(
  (
    {
      range,
      cellSize = 10,
      cellMargin = 1,
      cellsStyle,
      daysStyle,
      monthsStyle,
      style: timelineStyle,
      ...props
    },
    ref,
  ) => {
    const [start, end] = range;

    const days = differenceInDays(end, start);

    return (
      <ScrollView horizontal>
        <View ref={ref} style={[timelineStyle, style.timeline]} {...props}>
          <View style={[monthsStyle, style.months]}></View>
          <View
            style={[
              style.body,
              {
                height: cellSize * 8 + cellMargin * 6,
              },
            ]}
          >
            <Days style={daysStyle} size={cellSize} />
            <View style={[cellsStyle, style.cells]}>
              {[...Array(days)].map((_, index) => {
                return <Cell key={index} size={cellSize} />;
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  },
);

const style = StyleSheet.create({
  timeline: {},
  months: {},
  body: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  cells: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});

export { Timeline };

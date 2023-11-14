import { StyleSheet, View, ViewProps } from 'react-native';

import { Body } from './Body';
import { Cells } from './Cells';
import { Days } from './Days';
import { Months } from './Months';
import { TimelineContextProvider } from './context';

interface TimelineProps extends ViewProps {
  range: [Date, Date];
  cellSize?: number;
  cellMargin?: number;
}

function Timeline({
  range,
  cellSize = 10,
  cellMargin = 1,
  children,
  style: timelineStyle,
  ...props
}: TimelineProps) {
  return (
    <TimelineContextProvider
      props={{
        range,
        cellSize,
        cellMargin,
      }}
    >
      <View style={[timelineStyle, style.timeline]} {...props}>
        {children}
      </View>
    </TimelineContextProvider>
  );
}

const style = StyleSheet.create({
  timeline: {
    display: 'flex',
    flexDirection: 'row',
  },
});

Timeline.Days = Days;
Timeline.Body = Body;
Timeline.Months = Months;
Timeline.Cells = Cells;

export { Timeline };

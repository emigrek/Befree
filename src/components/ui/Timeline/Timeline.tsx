import { StyleSheet, View } from 'react-native';

import { Body } from './Body';
import { Cells } from './Cells';
import { Days } from './Days';
import { Weeks } from './Weeks';
import { TimelineContextProvider } from './context';
import { TimelineComponentProps } from './types';

function Timeline({
  theme,
  range,
  data,
  cellSize = 10,
  cellMargin = 1,
  invert = false,
  distinctPast = false,
  children,
  style: timelineStyle,
  ...props
}: TimelineComponentProps) {
  return (
    <TimelineContextProvider
      props={{
        theme,
        range,
        data,
        cellSize,
        cellMargin,
        invert,
        distinctPast,
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
Timeline.Weeks = Weeks;
Timeline.Cells = Cells;

export { Timeline };

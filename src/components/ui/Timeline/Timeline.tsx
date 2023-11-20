import { StyleSheet, View } from 'react-native';

import { Body } from './Body';
import { Cells } from './Cells';
import { Days } from './Days';
import { Weeks } from './Weeks';
import { TimelineContextProvider } from './context';
import { TimelineComponentProps } from './types';

/**
 * `Timeline` is a function component that renders a timeline.
 *
 * @param {TimelineComponentProps} props - The properties that define the timeline.
 * @param {Date[]} props.range - The range of dates to be displayed in the timeline.
 * @param {Date[]} props.data - The data to be displayed in the timeline.
 * @param {number} [props.cellSize=10] - The size of each cell in the timeline.
 * @param {number} [props.cellMargin=1] - The margin around each cell in the timeline.
 * @param {boolean} [props.invert=false] - Whether to invert the colors of the timeline.
 * @param {boolean} [props.distinctPast=false] - Whether to distinguish past dates from future dates.
 * @returns {ReactElement} The rendered timeline.
 */
function Timeline({
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

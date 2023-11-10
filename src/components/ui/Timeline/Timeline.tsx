import { View, ViewProps } from 'react-native';

import { Body } from './Body';
import { Cells } from './Cells';
import { Days } from './Days';
import { TimelineContextProvider } from './context';

interface TimelineProps extends ViewProps {
  range: [Date, Date];
  cellSize?: number;
  cellMargin?: number;
  cellStyle?: ViewProps['style'];
  dayStyle?: ViewProps['style'];
  monthStyle?: ViewProps['style'];
}

function Timeline({
  range,
  cellSize = 10,
  cellMargin = 1,
  cellStyle,
  dayStyle,
  monthStyle,
  children,
  ...props
}: TimelineProps) {
  return (
    <TimelineContextProvider
      props={{
        range,
        cellSize,
        cellMargin,
        cellStyle,
        dayStyle,
        monthStyle,
      }}
    >
      <View {...props}>{children}</View>
    </TimelineContextProvider>
  );
}

Timeline.Body = Body;
Timeline.Days = Days;
Timeline.Cells = Cells;

// const Timeline = forwardRef<View, TimelineProps>(
//   (
//     { cellSize = 10, cellMargin = 1, style: timelineStyle, children, ...props },
//     ref,
//   ) => {
//     return (
//       <TimelineContextProvider
//         props={{
//           cellSize,
//           cellMargin,
//           ...props,
//         }}
//       >
//         <View ref={ref} style={[timelineStyle, style.timeline]} {...props}>
//           {children}
//         </View>
//       </TimelineContextProvider>
//     );
//   },
// );

// const Timeline = forwardRef<View, ViewProps>(
//   ({ style: timelineStyle, ...props }, ref) => {
//     const { range, monthsStyle, cellSize, cellMargin, cellsStyle } =
//       useTimelineContext();
//     const [start, end] = range;
//     const days = differenceInDays(end, start);

//     return (
//       <View ref={ref} style={[timelineStyle, style.timeline]} {...props}>
//         <View style={[monthsStyle, style.months]}></View>
//         <View
//           style={[
//             style.body,
//             {
//               height: cellSize * 8 + cellMargin * 6,
//             },
//           ]}
//         >
//           <Days style={style.days} />
//           <ScrollView horizontal>
//             <View style={[cellsStyle, style.cells]}>
//               {[...Array(days)].map((_, index) => {
//                 return <Cell key={index} />;
//               })}
//             </View>
//           </ScrollView>
//         </View>
//       </View>
//     );
//   },
// );

export { Timeline };

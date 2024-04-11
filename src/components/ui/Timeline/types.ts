import { ViewProps } from 'react-native';
import { MD3Theme } from 'react-native-paper';

/**
 * `Timeline` is a function component that renders a timeline.
 *
 * @param {TimelineComponentProps} props - The properties that define the timeline.
 * @param {Theme} props.theme - The theme to be applied to the timeline.
 * @param {Date[]} props.range - The range of dates to be displayed in the timeline.
 * @param {Date[]} props.data - The data to be displayed in the timeline.
 * @param {number} [props.cellSize=10] - The size of each cell in the timeline.
 * @param {number} [props.cellMargin=1] - The margin around each cell in the timeline.
 * @param {number} [props.fontSize=10] - The size of the font in the timeline.
 * @param {boolean} [props.mirrored=false] - Whether the timeline should be mirrored.
 * @returns {ReactElement} The rendered timeline.
 */
export interface TimelineProps {
  theme?: MD3Theme;
  range: [Date, Date];
  data: Date[];
  cellSize?: number;
  cellMargin?: number;
  fontSize?: number;
  mirrored?: boolean;
  invertColor?: boolean;
}

export type TimelineComponentProps = TimelineProps & ViewProps;

export interface Cell {
  day: Date;
  backgroundColor: string;
  frequency: number;
  dayProgress?: number;
}

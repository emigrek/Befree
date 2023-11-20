import { ViewProps } from 'react-native';

export interface TimelineProps {
  range: [Date, Date];
  data: Date[];
  cellSize?: number;
  cellMargin?: number;
  invert?: boolean;
  distinctPast?: boolean;
}

export type TimelineComponentProps = TimelineProps & ViewProps;

export interface Cell {
  day: Date;
  backgroundColor: string;
}

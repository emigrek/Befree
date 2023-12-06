import {
  add,
  eachDayOfInterval,
  format,
  isAfter,
  isBefore,
  isToday,
  previousSunday,
  sub,
} from 'date-fns';
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { MD3Theme } from 'react-native-paper';

import { TimelineProps } from './types';

import { useTheme } from '@/theme';

interface TimelineContextProps {
  theme?: MD3Theme;
  setTheme?: Dispatch<SetStateAction<MD3Theme>>;
  range: [Date, Date];
  setRange: Dispatch<SetStateAction<[Date, Date]>>;
  data: Date[];
  setData: Dispatch<SetStateAction<Date[]>>;
  cellsData: {
    day: Date;
    backgroundColor: string;
  }[];
  cellSize: number;
  setCellSize: Dispatch<SetStateAction<number>>;
  cellMargin: number;
  setCellMargin: Dispatch<SetStateAction<number>>;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
  invert?: boolean;
  setInvert?: Dispatch<SetStateAction<boolean>>;
  distinctPast?: boolean;
  setDistinctPast?: Dispatch<SetStateAction<boolean>>;
}

export const TimelineContext = createContext<TimelineContextProps>({
  theme: undefined,
  setTheme: () => {
    //do nothing
  },
  range: [sub(new Date(), { months: 6 }), add(new Date(), { months: 6 })],
  setRange: () => {
    //do nothing
  },
  data: [],
  setData: () => {
    // do nothing
  },
  cellsData: [],
  cellSize: 10,
  setCellSize: () => {
    //do nothing
  },
  cellMargin: 1,
  setCellMargin: () => {
    //do nothing
  },
  fontSize: 8,
  setFontSize: () => {
    //do nothing
  },
  invert: false,
  setInvert: () => {
    //do nothing
  },
  distinctPast: false,
  setDistinctPast: () => {
    //do nothing
  },
});

interface TimelineContextProviderProps {
  props: TimelineProps;
  children?: ReactNode;
}

const TimelineContextProvider: FC<TimelineContextProviderProps> = ({
  props,
  children,
}) => {
  const defaultTheme = useTheme();
  const [theme, setTheme] = useState<MD3Theme>(defaultTheme);
  const [range, setRange] = useState<[Date, Date]>([
    previousSunday(props.range[0]),
    props.range[1],
  ]);
  const [data, setData] = useState<Date[]>(props.data);
  const [cellSize, setCellSize] = useState<number>(props.cellSize || 10);
  const [cellMargin, setCellMargin] = useState<number>(props.cellMargin || 1);
  const [fontSize, setFontSize] = useState<number>(props.fontSize || 8);
  const [invert, setInvert] = useState<boolean>(props.invert || false);
  const [distinctPast, setDistinctPast] = useState<boolean>(
    props.invert ? true : props.distinctPast || false,
  );

  const cellsData = useMemo(() => {
    const frequencyMap = props.data.reduce<{ [key: string]: number }>(
      (map, date) => {
        const key = format(date, 'yyyy-MM-dd');
        map[key] = (map[key] || 0) + 1;
        return map;
      },
      {},
    );

    const maxCount = Math.max(...Object.values(frequencyMap));

    const days = eachDayOfInterval({
      start: range[0],
      end: range[1],
    });

    const cells = days.map(day => {
      const key = format(day, 'yyyy-MM-dd');
      const frequency = frequencyMap[key] || 0;
      const alpha = invert
        ? (maxCount - frequency) / maxCount
        : frequency / maxCount;
      const alphaHex = Math.round(alpha * 255).toString(16);
      const dayProgress = isToday(day) ? new Date().getHours() / 24 : 1;

      if (
        !invert &&
        distinctPast &&
        isBefore(day, new Date()) &&
        frequency === 0
      ) {
        return {
          day,
          backgroundColor: `${theme.colors.outline}20`,
          dayProgress,
        };
      }

      if (invert && distinctPast && isAfter(day, new Date())) {
        return {
          day,
          backgroundColor: `transparent`,
        };
      }

      return {
        day,
        backgroundColor: `${theme.colors.primary}${alphaHex.padStart(2, '0')}`,
      };
    });

    return cells;
  }, [
    props.data,
    theme.colors.primary,
    range,
    invert,
    distinctPast,
    theme.colors.outline,
  ]);

  return (
    <TimelineContext.Provider
      value={{
        theme,
        setTheme,
        range,
        setRange,
        data,
        setData,
        cellsData,
        cellSize,
        setCellSize,
        cellMargin,
        setCellMargin,
        fontSize,
        setFontSize,
        invert,
        setInvert,
        distinctPast,
        setDistinctPast,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error(
      'useTimelineContext must be used within a TimelineContextProvider',
    );
  }
  return context;
};

export { TimelineContextProvider };

import {
  add,
  eachDayOfInterval,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSunday,
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
  color?: string;
  setColor?: Dispatch<SetStateAction<string>>;
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
  color: undefined,
  setColor: () => {
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
    props.range[0],
    props.range[1],
  ]);
  const [data, setData] = useState<Date[]>(props.data);
  const [cellSize, setCellSize] = useState<number>(props.cellSize || 10);
  const [cellMargin, setCellMargin] = useState<number>(props.cellMargin || 1);
  const [fontSize, setFontSize] = useState<number>(props.fontSize || 8);
  const [invert, setInvert] = useState<boolean>(props.invert || false);
  const [distinctPast, setDistinctPast] = useState<boolean>(
    props.distinctPast || false,
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

    const sunday = isSunday(range[0]) ? range[0] : previousSunday(range[0]);
    const days = eachDayOfInterval({
      start: sunday,
      end: range[1],
    });

    const cells = days.map(day => {
      const key = format(day, 'yyyy-MM-dd');
      const frequency = frequencyMap[key] || 0;
      const alpha = invert ? 1 - frequency / maxCount : frequency / maxCount;
      const alphaHex = Math.round(alpha * 255).toString(16);
      const totalSeconds =
        new Date().getHours() * 60 * 60 +
        new Date().getMinutes() * 60 +
        new Date().getSeconds();
      const dayProgress = isToday(day) ? totalSeconds / (24 * 60 * 60) : 1;

      if (!invert) {
        const backgroundColor = `${
          props.color || defaultTheme.colors.primary
        }${alphaHex.padStart(2, '0')}`;

        const distinctPastBackgroundColor =
          alpha === 0 && distinctPast && !isToday(day)
            ? defaultTheme.colors.border
            : backgroundColor;

        return {
          day,
          backgroundColor: distinctPastBackgroundColor,
          dayProgress,
        };
      }

      if (
        invert &&
        (isAfter(day, range[0]) || isSameDay(day, range[0])) &&
        isBefore(day, new Date())
      ) {
        const generatedColor = `${
          props.color || defaultTheme.colors.primary
        }${alphaHex.padStart(2, '0')}`;

        const backgroundColor = isToday(day)
          ? alpha > 0
            ? generatedColor
            : props.color || defaultTheme.colors.primary
          : generatedColor;

        const distinctPastBackgroundColor =
          alpha === 0 && distinctPast && !isToday(day)
            ? defaultTheme.colors.border
            : backgroundColor;

        return {
          day,
          backgroundColor: distinctPastBackgroundColor,
          dayProgress,
        };
      }

      return {
        day,
        backgroundColor: 'transparent',
      };
    });

    return cells;
  }, [props.data, range, invert, distinctPast, props.color, defaultTheme]);

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

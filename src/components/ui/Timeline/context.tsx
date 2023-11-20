import {
  eachDayOfInterval,
  format,
  isAfter,
  isBefore,
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

import { TimelineProps } from './types';

import { useTheme } from '@/theme';

interface TimelineContextProps {
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
  invert?: boolean;
  setInvert?: Dispatch<SetStateAction<boolean>>;
  distinctPast?: boolean;
  setDistinctPast?: Dispatch<SetStateAction<boolean>>;
}

export const TimelineContext = createContext<TimelineContextProps>({
  range: [previousSunday(sub(new Date(), { years: 1 })), new Date()],
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
  const { colors } = useTheme();
  const [range, setRange] = useState<[Date, Date]>([
    previousSunday(props.range[0]),
    props.range[1],
  ]);
  const [data, setData] = useState<Date[]>(props.data);
  const [cellSize, setCellSize] = useState<number>(props.cellSize || 10);
  const [cellMargin, setCellMargin] = useState<number>(props.cellMargin || 1);
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

      if (
        !invert &&
        distinctPast &&
        isBefore(day, new Date()) &&
        frequency === 0
      ) {
        return {
          day,
          backgroundColor: `${colors.outline}10`,
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
        backgroundColor: `${colors.primary}${alphaHex.padStart(2, '0')}`,
      };
    });

    return cells;
  }, [props.data, colors.primary, range, invert, distinctPast, colors.outline]);

  return (
    <TimelineContext.Provider
      value={{
        range,
        setRange,
        data,
        setData,
        cellsData,
        cellSize,
        setCellSize,
        cellMargin,
        setCellMargin,
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

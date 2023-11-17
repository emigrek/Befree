import { eachDayOfInterval, format, previousSunday, sub } from 'date-fns';
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
      const alpha = frequencyMap[key] / maxCount;
      const alphaHex = Math.round(alpha * 255).toString(16);

      return {
        day,
        backgroundColor: `${colors.primary}${alphaHex.padStart(2, '0')}`,
      };
    });

    return cells;
  }, [props.data, colors.primary, range]);

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

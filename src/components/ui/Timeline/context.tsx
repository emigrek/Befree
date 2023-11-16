import { format, sub } from 'date-fns';
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

import { useTheme } from '@/theme';

interface TimelineProps {
  range: [Date, Date];
  setRange?: Dispatch<SetStateAction<[Date, Date]>>;
  data: Date[];
  setData?: Dispatch<SetStateAction<Date[]>>;
  colorMap?: { [key: string]: string };
  cellSize: number;
  setCellSize?: Dispatch<SetStateAction<number>>;
  cellMargin: number;
  setCellMargin?: Dispatch<SetStateAction<number>>;
}

export const TimelineContext = createContext<TimelineProps>({
  range: [sub(new Date(), { years: 1 }), new Date()],
  setRange: () => {
    //do nothing
  },
  data: [],
  setData: () => {
    //do nothing
  },
  colorMap: {},
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
  const [range, setRange] = useState<[Date, Date]>(
    props.range || [sub(new Date(), { years: 1 }), new Date()],
  );
  const [data, setData] = useState<Date[]>(props.data || []);
  const [cellSize, setCellSize] = useState<number>(props.cellSize || 10);
  const [cellMargin, setCellMargin] = useState<number>(props.cellMargin || 1);

  const colorMap = useMemo(() => {
    const frequencyMap = data.reduce<{ [key: string]: number }>((map, date) => {
      const key = format(date, 'yyyy-MM-dd');
      map[key] = (map[key] || 0) + 1;
      return map;
    }, {});

    const maxCount = Math.max(...Object.values(frequencyMap));

    const colorMap = Object.keys(frequencyMap).reduce<{
      [key: string]: string;
    }>((map, key) => {
      const alpha = frequencyMap[key] / maxCount;
      const alphaHex = Math.round(alpha * 255).toString(16);
      map[key] = `${colors.primary}${alphaHex.padStart(2, '0')}`;
      return map;
    }, {});

    return colorMap;
  }, [data, colors]);

  return (
    <TimelineContext.Provider
      value={{
        range,
        setRange,
        data,
        setData,
        colorMap,
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

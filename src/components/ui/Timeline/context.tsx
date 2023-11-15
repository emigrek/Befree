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

interface TimelineProps {
  range: [Date, Date];
  setRange?: Dispatch<SetStateAction<[Date, Date]>>;
  data: Date[];
  setData?: Dispatch<SetStateAction<Date[]>>;
  dataMaxCount?: number;
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
  dataMaxCount: 0,
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
  const [range, setRange] = useState<[Date, Date]>(
    props.range || [sub(new Date(), { years: 1 }), new Date()],
  );
  const [data, setData] = useState<Date[]>(props.data || []);
  const [cellSize, setCellSize] = useState<number>(props.cellSize || 10);
  const [cellMargin, setCellMargin] = useState<number>(props.cellMargin || 1);

  const dataMaxCount = useMemo(() => {
    const frequencyMap = data.reduce<{ [key: string]: number }>((map, date) => {
      const key = format(date, 'yyyy-MM-dd');
      map[key] = (map[key] || 0) + 1;
      return map;
    }, {});

    const maxCount = Math.max(...Object.values(frequencyMap));

    return maxCount;
  }, [data]);

  return (
    <TimelineContext.Provider
      value={{
        range,
        setRange,
        data,
        setData,
        dataMaxCount,
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

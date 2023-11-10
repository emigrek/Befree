import { sub } from 'date-fns';
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { ViewProps } from 'react-native';

interface TimelineProps {
  range: [Date, Date];
  setRange?: Dispatch<SetStateAction<[Date, Date]>>;
  cellSize: number;
  setCellSize?: Dispatch<SetStateAction<number>>;
  cellMargin: number;
  setCellMargin?: Dispatch<SetStateAction<number>>;
  cellStyle?: ViewProps['style'];
  setCellStyle?: Dispatch<SetStateAction<ViewProps['style']>>;
  dayStyle?: ViewProps['style'];
  setDayStyle?: Dispatch<SetStateAction<ViewProps['style']>>;
  monthStyle?: ViewProps['style'];
  setMonthStyle?: Dispatch<SetStateAction<ViewProps['style']>>;
}

export const TimelineContext = createContext<TimelineProps>({
  range: [sub(new Date(), { years: 1 }), new Date()],
  setRange: () => {
    //do nothing
  },
  cellSize: 10,
  setCellSize: () => {
    //do nothing
  },
  cellMargin: 1,
  setCellMargin: () => {
    //do nothing
  },
  cellStyle: {},
  setCellStyle: () => {
    //do nothing
  },
  dayStyle: {},
  setDayStyle: () => {
    //do nothing
  },
  monthStyle: {},
  setMonthStyle: () => {
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
  const [cellSize, setCellSize] = useState<number>(props.cellSize || 10);
  const [cellMargin, setCellMargin] = useState<number>(props.cellMargin || 1);
  const [cellStyle, setCellStyle] = useState<ViewProps['style']>(
    props.cellStyle || {},
  );
  const [dayStyle, setDayStyle] = useState<ViewProps['style']>(
    props.dayStyle || {},
  );
  const [monthStyle, setMonthStyle] = useState<ViewProps['style']>(
    props.monthStyle || {},
  );

  return (
    <TimelineContext.Provider
      value={{
        range,
        setRange,
        cellSize,
        setCellSize,
        cellMargin,
        setCellMargin,
        cellStyle,
        setCellStyle,
        dayStyle,
        setDayStyle,
        monthStyle,
        setMonthStyle,
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

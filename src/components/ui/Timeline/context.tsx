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

interface TimelineProps {
  range: [Date, Date];
  setRange?: Dispatch<SetStateAction<[Date, Date]>>;
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
  const [cellSize, setCellSize] = useState<number>(props.cellSize || 10);
  const [cellMargin, setCellMargin] = useState<number>(props.cellMargin || 1);

  return (
    <TimelineContext.Provider
      value={{
        range,
        setRange,
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

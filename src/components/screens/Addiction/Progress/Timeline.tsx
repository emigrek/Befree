import { nextSaturday } from 'date-fns';
import { FC, useMemo } from 'react';

import { Timeline as TimelinePrimitive } from '@/components/ui/Timeline';
import { useSortedRelapses } from '@/hooks/addiction/useSortedRelapses';

interface TimelineProps {
  addiction: Addiction;
}

const Timeline: FC<TimelineProps> = ({ addiction }) => {
  const sortedRelapses = useSortedRelapses({ addiction });

  const data = useMemo(() => {
    return addiction.relapses.map(relapse => new Date(relapse));
  }, [addiction.relapses]);

  const range: [Date, Date] = useMemo(() => {
    return [new Date(sortedRelapses[0]), nextSaturday(new Date())];
  }, [sortedRelapses]);

  return (
    <TimelinePrimitive
      data={data}
      range={range}
      cellSize={22}
      fontSize={12}
      mirrored
    >
      <TimelinePrimitive.Days />
      <TimelinePrimitive.Body>
        <TimelinePrimitive.Weeks />
        <TimelinePrimitive.Cells />
      </TimelinePrimitive.Body>
    </TimelinePrimitive>
  );
};

export { Timeline };

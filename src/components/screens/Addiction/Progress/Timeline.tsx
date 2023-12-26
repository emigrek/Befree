import { nextSaturday } from 'date-fns';
import { FC, useMemo } from 'react';

import { Timeline as TimelinePrimitive } from '@/components/ui/Timeline';
import { useSortedRelapses } from '@/hooks/addiction/useSortedRelapses';

interface TimelineProps {
  addiction: Addiction;
}

const Timeline: FC<TimelineProps> = ({ addiction }) => {
  const sortedRelapses = useSortedRelapses({ addiction });
  const timelineRange: [Date, Date] = useMemo(() => {
    return [sortedRelapses[0], nextSaturday(new Date())];
  }, [sortedRelapses]);

  return (
    <TimelinePrimitive
      data={addiction.relapses}
      range={timelineRange}
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

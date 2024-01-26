import { FC, useMemo } from 'react';

import { Timeline as TimelinePrimitive } from '@/components/ui/Timeline';

interface TimelineProps {
  relapses: Relapse[];
}

const Timeline: FC<TimelineProps> = ({ relapses }) => {
  const data = useMemo(() => {
    return relapses.map(relapse => relapse.createdAt);
  }, [relapses]);

  const range = useMemo(() => {
    const first = data[0];
    const last = data[data.length - 1];

    return [first, last] as [Date, Date];
  }, [data]);

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

import { FC, useMemo } from 'react';

import { Timeline as TimelinePrimitive } from '@/components/ui/Timeline';

interface TimelineProps {
  addiction: Addiction;
}

const Timeline: FC<TimelineProps> = ({ addiction }) => {
  const data = useMemo(() => {
    return addiction.relapses.map(relapse => new Date(relapse.relapseAt));
  }, [addiction]);

  const range = useMemo(() => {
    const first = data[0];
    const last = data[data.length - 1];

    return [first, last] as [Date, Date];
  }, [data]);

  if (!addiction.relapses.length) return null;

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

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
    if (data.length === 1)
      return [data[data.length - 1], new Date()] as [Date, Date];

    return [data[0], data[data.length - 1]] as [Date, Date];
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

import { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Timeline as TimelinePrimitive } from '@/components/ui/Timeline';

interface TimelineProps {
  addiction: Addiction;
}

const Timeline: FC<TimelineProps> = ({ addiction }) => {
  const data = useMemo(() => {
    return [
      new Date(addiction.startedAt),
      ...addiction.relapses.map(relapse => new Date(relapse.relapseAt)),
    ];
  }, [addiction]);

  const range = useMemo(() => {
    const left = data[0];
    const right = data.length === 1 ? new Date() : data[data.length - 1];
    return [left, right] as [Date, Date];
  }, [data]);

  return (
    <TimelinePrimitive
      data={data}
      range={range}
      cellSize={22}
      fontSize={12}
      mirrored
      style={style.container}
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

const style = StyleSheet.create({
  container: {
    paddingLeft: 8,
    paddingVertical: 8,
  },
});

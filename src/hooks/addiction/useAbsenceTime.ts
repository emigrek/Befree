import { differenceInMilliseconds } from 'date-fns';
import { useCallback, useState } from 'react';
import { useElapsedTime } from 'use-elapsed-time';

export interface UseAbsenceTimeProps {
  addiction: Addiction;
  refresh?: boolean;
}

export const useAbsenceTime = ({
  addiction,
  refresh = true,
}: UseAbsenceTimeProps) => {
  const [absenceTime, setAbsenceTime] = useState<number>(
    differenceInMilliseconds(new Date(), new Date(addiction.lastRelapse)),
  );

  useElapsedTime({
    isPlaying: refresh,
    updateInterval: 1,
    onUpdate: useCallback(() => {
      const timeDiff = differenceInMilliseconds(
        new Date(),
        new Date(addiction.lastRelapse),
      );
      setAbsenceTime(timeDiff);
    }, [addiction.lastRelapse]),
  });

  return { absenceTime };
};

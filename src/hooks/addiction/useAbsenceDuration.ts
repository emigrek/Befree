import {
  Duration,
  differenceInMilliseconds,
  intervalToDuration,
} from 'date-fns';
import { useCallback, useState } from 'react';
import { useElapsedTime } from 'use-elapsed-time';

import { useAddictionLastRelapse } from '@/hooks/relapse/useAddictionLastRelapse';

export interface UseAbsenceDurationProps {
  addiction: Addiction;
  refresh?: boolean;
}

export const useAbsenceDuration = ({
  addiction,
  refresh = true,
}: UseAbsenceDurationProps) => {
  const lastRelapse = useAddictionLastRelapse({ addiction });
  const [absenceDuration, setAbsenceDuration] = useState<Duration>(
    intervalToDuration({
      start: lastRelapse,
      end: new Date(),
    }),
  );
  const [absenceTime, setAbsenceTime] = useState<number>(
    differenceInMilliseconds(new Date(), lastRelapse),
  );

  useElapsedTime({
    isPlaying: refresh,
    updateInterval: 1,
    onUpdate: useCallback(() => {
      setAbsenceDuration(
        intervalToDuration({
          start: lastRelapse,
          end: new Date(),
        }),
      );
      setAbsenceTime(differenceInMilliseconds(new Date(), lastRelapse));
    }, [lastRelapse]),
  });

  return {
    time: absenceTime,
    duration: absenceDuration,
  };
};

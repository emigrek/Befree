import {
  Duration,
  differenceInMilliseconds,
  intervalToDuration,
} from 'date-fns';
import { useCallback, useState } from 'react';
import { useElapsedTime } from 'use-elapsed-time';

import { useAddictionLastRelapse } from '@/hooks/relapse/useAddictionLastRelapse';

export interface UseAbstinenceDurationProps {
  addiction: Addiction;
  refresh?: boolean;
}

export const useAbstinenceDuration = ({
  addiction,
  refresh = true,
}: UseAbstinenceDurationProps) => {
  const lastRelapse = useAddictionLastRelapse({ addiction });
  const [abscinenceDuration, setAbscinenceDuration] = useState<Duration>(
    intervalToDuration({
      start: lastRelapse,
      end: new Date(),
    }),
  );
  const [abstinenceTime, setAbstinenceTime] = useState<number>(
    differenceInMilliseconds(new Date(), lastRelapse),
  );

  useElapsedTime({
    isPlaying: refresh,
    updateInterval: 1,
    onUpdate: useCallback(() => {
      setAbscinenceDuration(
        intervalToDuration({
          start: lastRelapse,
          end: new Date(),
        }),
      );
      setAbstinenceTime(differenceInMilliseconds(new Date(), lastRelapse));
    }, [lastRelapse]),
  });

  return {
    time: abstinenceTime,
    duration: abscinenceDuration,
  };
};

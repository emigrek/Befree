import {
  Duration,
  differenceInMilliseconds,
  intervalToDuration,
} from 'date-fns';
import { useCallback, useState } from 'react';
import { useElapsedTime } from 'use-elapsed-time';

import { Addiction } from '@/structures';

export interface UseAbstinenceDurationProps {
  addiction: Addiction;
  refresh?: boolean;
}

export const useAbstinenceDuration = ({
  addiction,
  refresh = true,
}: UseAbstinenceDurationProps) => {
  const [abscinenceDuration, setAbscinenceDuration] = useState<Duration>({});
  const [abstinenceTime, setAbstinenceTime] = useState<number>(0);

  useElapsedTime({
    isPlaying: refresh,
    updateInterval: 1,
    onUpdate: useCallback(() => {
      setAbscinenceDuration(
        intervalToDuration({
          start: new Date(addiction.lastRelapse.relapseAt),
          end: new Date(),
        }),
      );
      setAbstinenceTime(
        differenceInMilliseconds(
          new Date(),
          new Date(addiction.lastRelapse.relapseAt),
        ),
      );
    }, [addiction]),
  });

  return {
    time: abstinenceTime,
    duration: abscinenceDuration,
  };
};

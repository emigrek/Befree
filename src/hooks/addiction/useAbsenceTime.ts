import { differenceInMilliseconds } from 'date-fns';
import { useCallback, useState } from 'react';
import { useElapsedTime } from 'use-elapsed-time';

import { useAddictionLastRelapse } from '../relapse/useAddictionLastRelapse';

export interface UseAbsenceTimeProps {
  addiction: Addiction;
  refresh?: boolean;
}

export const useAbsenceTime = ({
  addiction,
  refresh = true,
}: UseAbsenceTimeProps) => {
  const lastRelapse = useAddictionLastRelapse({ addiction });
  const [absenceTime, setAbsenceTime] = useState<number>(
    lastRelapse ? differenceInMilliseconds(new Date(), lastRelapse) : 0,
  );

  useElapsedTime({
    isPlaying: refresh,
    updateInterval: 1,
    onUpdate: useCallback(() => {
      setAbsenceTime(
        lastRelapse ? differenceInMilliseconds(new Date(), lastRelapse) : 0,
      );
    }, [lastRelapse]),
  });

  return { absenceTime };
};

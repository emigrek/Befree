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
  const [absenceTime, setAbsenceTime] = useState<number>(0);

  useElapsedTime({
    isPlaying: refresh,
    updateInterval: 1,
    onUpdate: useCallback(() => {
      const time = lastRelapse
        ? differenceInMilliseconds(new Date(), lastRelapse)
        : 0;
      setAbsenceTime(time);
    }, [lastRelapse]),
  });

  return { absenceTime };
};

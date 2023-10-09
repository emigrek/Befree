import { differenceInMilliseconds } from 'date-fns';
import { useCallback, useState } from 'react';
import { useElapsedTime } from 'use-elapsed-time';

import { useLastRelapse } from './useLastRelapse';

export interface UseAbsenceTimeProps {
  addiction: Addiction;
  refresh?: boolean;
}

export const useAbsenceTime = ({
  addiction,
  refresh = true,
}: UseAbsenceTimeProps) => {
  const lastRelapse = useLastRelapse({
    addiction,
  });
  const [absenceTime, setAbsenceTime] = useState<number>(
    differenceInMilliseconds(new Date(), lastRelapse),
  );

  useElapsedTime({
    isPlaying: refresh,
    updateInterval: 1,
    onUpdate: useCallback(() => {
      const timeDiff = differenceInMilliseconds(new Date(), lastRelapse);
      setAbsenceTime(timeDiff);
    }, [lastRelapse]),
  });

  return { absenceTime };
};

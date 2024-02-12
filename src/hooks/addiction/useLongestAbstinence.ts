import { useMemo } from 'react';

import { Abstinence, AchievementManager } from '@/services/managers/local';

interface UseLongestAbstinenceProps {
  addiction: Addiction;
}

const useLongestAbstinence = ({
  addiction,
}: UseLongestAbstinenceProps): Abstinence => {
  const longestAbsence = useMemo(() => {
    const relapses = [
      ...addiction.relapses.map(r => new Date(r.relapseAt)),
      addiction.createdAt,
    ];

    return AchievementManager.getLongestAbstinence(relapses);
  }, [addiction]);

  return longestAbsence;
};

export { useLongestAbstinence };

import { useMemo } from 'react';

import { Abstinence, AchievementManager } from '@/services/managers/local';

interface UseLongestAbstinenceProps {
  addiction: Addiction;
}

const useLongestAbstinence = ({
  addiction,
}: UseLongestAbstinenceProps): Abstinence => {
  return useMemo(() => {
    const relapses = [
      ...addiction.relapses.map(r => new Date(r.relapseAt)),
      addiction.startedAt,
    ];
    return AchievementManager.getLongestAbstinence(relapses);
  }, [addiction]);
};

export { useLongestAbstinence };

import { useMemo } from 'react';

import { Abstinence, Addiction } from '@/structures';

interface UseLongestAbstinenceProps {
  addiction: Addiction;
}

const useLongestAbstinence = ({
  addiction,
}: UseLongestAbstinenceProps): Abstinence => {
  return useMemo(() => {
    return addiction.achievements.getLongestAbstinence();
  }, [addiction]);
};

export { useLongestAbstinence };

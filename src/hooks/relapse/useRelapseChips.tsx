import { useMemo } from 'react';

import { useLongestAbstinence } from '@/hooks/addiction/useLongestAbstinence';
import i18n from '@/i18n';
import { Addiction, Relapse } from '@/structures';

interface RelapseChipsProps {
  relapse: Relapse;
  addiction: Addiction;
}

interface RelapseChip {
  label: string;
  icon: string;
}

const useRelapseChips = ({ relapse, addiction }: RelapseChipsProps) => {
  const longestAbstinence = useLongestAbstinence({ addiction });
  const isLongestAbstinenceEnd = longestAbstinence.end
    ? longestAbstinence.end.getTime() === new Date(relapse.relapseAt).getTime()
    : false;

  return useMemo(
    () =>
      [
        relapse.isStartedRelapse && {
          label: i18n.t(['labels', 'startedAt']),
          icon: 'star',
        },
        isLongestAbstinenceEnd && {
          label: i18n.t(['labels', 'longestAbstinenceEnd']),
          icon: 'timer-sand',
        },
      ].filter(Boolean) as RelapseChip[],
    [relapse, isLongestAbstinenceEnd],
  );
};

export { RelapseChip, useRelapseChips };

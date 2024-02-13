import { useMemo } from 'react';

import { useLongestAbstinence } from '@/hooks/addiction/useLongestAbstinence';
import i18n from '@/i18n';

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
  const isStartedAt = relapse.id === 'startedAt';
  const isLongestAbstinenceEnd = longestAbstinence.end
    ? longestAbstinence.end.getTime() === new Date(relapse.relapseAt).getTime()
    : false;

  return useMemo(
    () =>
      [
        isStartedAt && {
          label: i18n.t(['labels', 'startedAt']),
          icon: 'star',
        },
        isLongestAbstinenceEnd && {
          label: i18n.t(['labels', 'longestAbstinenceEnd']),
          icon: 'timer-sand',
        },
      ].filter(Boolean) as RelapseChip[],
    [isStartedAt, isLongestAbstinenceEnd],
  );
};

export { RelapseChip, useRelapseChips };

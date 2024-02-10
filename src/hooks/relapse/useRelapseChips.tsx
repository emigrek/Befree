import { useMemo } from 'react';

import { useLongestAbsence } from '@/hooks/addiction/useLongestAbsence';
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
  const longestAbsence = useLongestAbsence({ addiction });
  const isStartedAt = relapse.id === 'startedAt';
  const isLongestAbsenceEnd = longestAbsence.end
    ? longestAbsence.end.getTime() === new Date(relapse.relapseAt).getTime()
    : false;

  return useMemo(
    () =>
      [
        isStartedAt && {
          label: i18n.t(['labels', 'startedAt']),
          icon: 'star',
        },
        isLongestAbsenceEnd && {
          label: i18n.t(['labels', 'longestAbsenceEnd']),
          icon: 'timer-sand',
        },
      ].filter(Boolean) as RelapseChip[],
    [isStartedAt, isLongestAbsenceEnd],
  );
};

export { RelapseChip, useRelapseChips };

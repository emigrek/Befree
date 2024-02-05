import { useMemo } from 'react';

import { useLongestAbsence } from '@/hooks/addiction/useLongestAbsence';
import i18n from '@/i18n';

interface RelapseCardChipsProps {
  relapse: Relapse;
  addiction: Addiction;
}

interface RelapseCardChip {
  label: string;
  icon: string;
}

const useRelapseCardChips = ({ relapse, addiction }: RelapseCardChipsProps) => {
  const longestAbsence = useLongestAbsence({ addiction });
  const isStartedAt = relapse.id === 'startedAt';
  const isLongestAbsenceEnd = longestAbsence.end
    ? longestAbsence.end.getTime() === new Date(relapse.relapseAt).getTime()
    : false;

  return useMemo(
    () =>
      [
        isStartedAt && {
          label: i18n.t([
            'modals',
            'addiction',
            'relapses',
            'list',
            'startedAt',
          ]),
          icon: 'star',
        },
        isLongestAbsenceEnd && {
          label: i18n.t([
            'modals',
            'addiction',
            'relapses',
            'list',
            'longestAbsenceEnd',
          ]),
          icon: 'timer-sand',
        },
      ].filter(Boolean) as RelapseCardChip[],
    [isStartedAt, isLongestAbsenceEnd],
  );
};

export { useRelapseCardChips };

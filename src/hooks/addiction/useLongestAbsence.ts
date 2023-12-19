import { useMemo } from 'react';

import { getSortedRelapses, useSortedRelapses } from './useSortedRelapses';

interface UseLongestAbsenceProps {
  addiction: Addiction;
}

interface LongestAbsence {
  start: Date;
  end: Date | null;
}

const useLongestAbsence = ({
  addiction,
}: UseLongestAbsenceProps): LongestAbsence => {
  const sortedRelapses = useSortedRelapses({ addiction, direction: 'desc' });

  const furthestDates = useMemo(() => {
    if (sortedRelapses.length < 2) {
      return {
        start: sortedRelapses[0],
        end: null,
      };
    }

    let maxDifference = 0;
    let result: LongestAbsence = {
      start: sortedRelapses[0],
      end: sortedRelapses[1],
    };

    for (let i = 0; i < sortedRelapses.length - 1; i++) {
      const current = sortedRelapses[i];
      const next = sortedRelapses[i + 1];

      const difference = Math.abs(next.getTime() - current.getTime());

      if (difference > maxDifference) {
        maxDifference = difference;
        result = {
          start: next,
          end: current,
        };
      }
    }

    return result;
  }, [sortedRelapses]);

  return furthestDates;
};

const getLongestAbsence = ({
  addiction,
}: UseLongestAbsenceProps): LongestAbsence => {
  const relapses = getSortedRelapses({ addiction, direction: 'desc' });

  if (relapses.length < 2) {
    return {
      start: relapses[0],
      end: null,
    };
  }

  let maxDifference = 0;
  let result: LongestAbsence = {
    start: relapses[0],
    end: relapses[1],
  };

  for (let i = 0; i < relapses.length - 1; i++) {
    const current = relapses[i];
    const next = relapses[i + 1];

    const difference = Math.abs(next.getTime() - current.getTime());

    if (difference > maxDifference) {
      maxDifference = difference;
      result = {
        start: next,
        end: current,
      };
    }
  }

  return result;
};

export { getLongestAbsence, useLongestAbsence };

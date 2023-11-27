import { useMemo } from 'react';

interface UseLongestAbsenceProps {
  addiction: Addiction;
}

interface LongestAbsence {
  start: Date;
  end: Date;
}

const useLongestAbsence = ({
  addiction,
}: UseLongestAbsenceProps): LongestAbsence => {
  const sortedRelapses = useMemo(() => {
    return [...addiction.relapses].sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    });
  }, [addiction.relapses]);

  const furthestDates = useMemo(() => {
    if (sortedRelapses.length < 2) {
      return {
        start: sortedRelapses[0],
        end: new Date(),
      };
    }

    let maxDifference = 0;
    let result = {
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

    const today = new Date();
    const lastRelapse = sortedRelapses[sortedRelapses.length - 1];
    const differenceToToday = today.getTime() - lastRelapse.getTime();

    if (differenceToToday > maxDifference) {
      result = {
        start: lastRelapse,
        end: new Date(),
      };
    }

    return result;
  }, [sortedRelapses]);

  return furthestDates;
};

export default useLongestAbsence;

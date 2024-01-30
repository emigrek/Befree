import { useMemo } from 'react';

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
  const longestAbsence = useMemo(() => {
    return getLongestAbsence({ addiction });
  }, [addiction]);

  return longestAbsence;
};

const getLongestAbsence = ({
  addiction,
}: UseLongestAbsenceProps): LongestAbsence => {
  const relapses = addiction.relapses.map(
    relapse => new Date(relapse.relapseAt),
  );

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

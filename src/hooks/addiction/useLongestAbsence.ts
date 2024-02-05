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
  const dates = [
    new Date(addiction.startedAt),
    ...addiction.relapses.map(r => new Date(r.relapseAt)),
    new Date(),
  ];
  let maxDifference = 0;
  let longestPeriod: LongestAbsence = { start: dates[0], end: null };

  for (let i = 0; i < dates.length - 1; i++) {
    const current = dates[i];
    const next = dates[i + 1];
    const difference = next.getTime() - current.getTime();

    if (difference > maxDifference) {
      maxDifference = difference;
      longestPeriod = { start: current, end: next };
    }
  }

  if (longestPeriod.end?.getTime() === new Date().getTime()) {
    longestPeriod.end = null;
  }

  return longestPeriod;
};

export { getLongestAbsence, useLongestAbsence };

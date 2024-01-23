import { useMemo } from 'react';

interface UseSortedRelapsesProps {
  addiction: Addiction;
  direction?: 'asc' | 'desc';
}

export const useSortedRelapses = ({
  addiction,
  direction = 'asc',
}: UseSortedRelapsesProps) => {
  return useMemo(() => {
    return getSortedRelapses({ addiction, direction });
  }, [addiction, direction]);
};

export const getSortedRelapses = ({
  addiction,
  direction = 'asc',
}: UseSortedRelapsesProps) => {
  return [...addiction.relapses]
    .sort((a, b) => {
      if (direction === 'asc') {
        return new Date(a).getTime() - new Date(b).getTime();
      }

      return new Date(b).getTime() - new Date(a).getTime();
    })
    .map(relapse => new Date(relapse));
};

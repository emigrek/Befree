import { useMemo } from 'react';

interface UseSortedRelapsesProps {
  addiction: Addiction;
  direction?: 'asc' | 'desc';
}

const useSortedRelapses = ({
  addiction,
  direction = 'asc',
}: UseSortedRelapsesProps): Date[] => {
  const sortedRelapses = useMemo(() => {
    return getSortedRelapses({ addiction, direction });
  }, [addiction, direction]);

  return sortedRelapses;
};

const getSortedRelapses = ({
  addiction,
  direction = 'asc',
}: UseSortedRelapsesProps): Date[] => {
  return [...addiction.relapses]
    .sort((a, b) => {
      if (direction === 'asc') {
        return a.createdAt.getTime() - b.createdAt.getTime();
      } else {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
    })
    .map(relapse => relapse.createdAt);
};

export { getSortedRelapses, useSortedRelapses };

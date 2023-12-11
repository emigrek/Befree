import { useMemo } from 'react';

interface UseSortedRelapsesProps {
  addiction: Addiction;
  direction?: 'asc' | 'desc';
}

export const useSortedRelapses = ({
  addiction,
  direction = 'asc',
}: UseSortedRelapsesProps) => {
  const sortedRelapses = useMemo(() => {
    const sorted = [...addiction.relapses].sort((a, b) => {
      if (direction === 'asc') {
        return new Date(a).getTime() - new Date(b).getTime();
      }

      return new Date(b).getTime() - new Date(a).getTime();
    });

    return sorted;
  }, [addiction, direction]);

  return sortedRelapses;
};

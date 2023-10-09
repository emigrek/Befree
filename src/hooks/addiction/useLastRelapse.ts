import { useMemo } from 'react';

export interface UseLastRelapseProps {
  addiction: Addiction;
}

export const useLastRelapse = ({ addiction }: UseLastRelapseProps) => {
  return useMemo(() => {
    const { relapses } = addiction;
    const lastRelapse = relapses[relapses.length - 1];

    return new Date(lastRelapse);
  }, [addiction]);
};

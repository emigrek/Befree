import { useMemo } from 'react';

import { useAddiction } from '../addiction/useAddiction';

interface UseRelapseProps {
  addictionId: string;
  relapseId: string;
}

export const useRelapse = ({ addictionId, relapseId }: UseRelapseProps) => {
  const addiction = useAddiction({ id: addictionId });

  return useMemo(() => {
    const relapse = addiction?.relapses.find(r => r.id === relapseId);

    return { relapse, addiction };
  }, [addiction, relapseId]);
};

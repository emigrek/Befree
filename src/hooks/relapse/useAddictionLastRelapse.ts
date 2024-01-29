import { useMemo } from 'react';

interface UseAddictionLastRelapseProps {
  addiction: Addiction;
}

const useAddictionLastRelapse = ({
  addiction,
}: UseAddictionLastRelapseProps): Date | null => {
  return useMemo(() => {
    return getLastRelapse({ addiction });
  }, [addiction]);
};

const getLastRelapse = ({
  addiction,
}: UseAddictionLastRelapseProps): Date | null => {
  const relapses = addiction.relapses;

  if (!relapses.length) {
    return null;
  }

  return relapses[0].relapseAt;
};

export { getLastRelapse, useAddictionLastRelapse };

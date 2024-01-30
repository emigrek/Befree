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
  if (!addiction.relapses.length) {
    return null;
  }

  return new Date(addiction.relapses[addiction.relapses.length - 1].relapseAt);
};

export { getLastRelapse, useAddictionLastRelapse };

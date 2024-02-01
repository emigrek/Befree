import { useMemo } from 'react';

interface UseAddictionLastRelapseProps {
  addiction: Addiction;
}

const useAddictionLastRelapse = ({
  addiction,
}: UseAddictionLastRelapseProps): Date => {
  return useMemo(() => {
    return getLastRelapse({ addiction });
  }, [addiction]);
};

const getLastRelapse = ({ addiction }: UseAddictionLastRelapseProps): Date => {
  if (!addiction.relapses.length) {
    return new Date(addiction.startedAt);
  }

  return new Date(addiction.relapses[addiction.relapses.length - 1].relapseAt);
};

export { getLastRelapse, useAddictionLastRelapse };

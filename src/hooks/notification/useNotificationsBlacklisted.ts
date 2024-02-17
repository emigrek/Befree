import { useMemo } from 'react';

import { useNotificationsBlacklistStore } from '@/store';

interface UseNotificationsBlacklistedProps {
  addiction: Addiction;
}

export const useNotificationsBlacklisted = ({
  addiction,
}: UseNotificationsBlacklistedProps) => {
  const blacklisted = useNotificationsBlacklistStore(
    state => state.blacklisted,
  );
  return useMemo(
    () => blacklisted.some(id => id === addiction.id),
    [blacklisted, addiction.id],
  );
};

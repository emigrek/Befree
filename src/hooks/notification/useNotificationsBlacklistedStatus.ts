import { useCallback, useEffect, useState } from 'react';

import { NotificationsBlacklistManager } from '@/services/managers/local';

interface UseNotificationsBlacklistProps {
  addiction: Addiction;
}

const useNotificationsBlacklistedStatus = ({
  addiction,
}: UseNotificationsBlacklistProps) => {
  const [blacklisted, setBlacklisted] = useState(false);

  const refresh = useCallback(async () => {
    const isBlacklisted = await NotificationsBlacklistManager.has(addiction.id);
    setBlacklisted(isBlacklisted);
  }, [setBlacklisted, addiction.id]);

  useEffect(() => {
    refresh();
  }, [refresh]);
  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    blacklisted,
    refresh,
  };
};

export { useNotificationsBlacklistedStatus };

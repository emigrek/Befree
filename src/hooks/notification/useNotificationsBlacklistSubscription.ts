import { useCallback, useEffect } from 'react';

import { NotificationsBlacklistManager } from '@/services/managers/local';
import { useNotificationsBlacklistStore } from '@/store';

const useNotificationsBlacklistSubscription = () => {
  const { setBlacklisted, addBlacklisted, removeBlacklisted } =
    useNotificationsBlacklistStore();

  const init = useCallback(async () => {
    const blacklisted = await NotificationsBlacklistManager.getInstance().get();
    setBlacklisted(blacklisted);
  }, [setBlacklisted]);

  useEffect(() => {
    init();
    const blacklistManager = NotificationsBlacklistManager.getInstance();

    const createListener = blacklistManager.addListener('add', (id: string) => {
      addBlacklisted(id);
    });

    const cancelListener = blacklistManager.addListener(
      'remove',
      (id: string) => {
        removeBlacklisted(id);
      },
    );

    return () => {
      createListener.remove();
      cancelListener.remove();
    };
  }, [addBlacklisted, removeBlacklisted, setBlacklisted, init]);
};

export { useNotificationsBlacklistSubscription };

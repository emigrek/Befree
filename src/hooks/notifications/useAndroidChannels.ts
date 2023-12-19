import notifee, { AndroidChannel } from '@notifee/react-native';
import { useCallback, useEffect, useMemo } from 'react';

export const useAndroidChannels = () => {
  const defaultChannel: AndroidChannel = useMemo(
    () => ({
      id: 'default',
      name: 'Default',
      description: 'Default notification channel',
    }),
    [],
  );

  const add = useCallback(async (channel: AndroidChannel) => {
    await notifee.createChannel(channel);
  }, []);

  useEffect(() => {
    (async () => {
      const channels = await notifee.getChannels();
      if (!channels.length) {
        await add(defaultChannel);
      }
    })();
  }, [add, defaultChannel]);
};

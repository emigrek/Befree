import { TriggerNotification } from '@notifee/react-native';
import { FC, useCallback } from 'react';
import { Button, Text } from 'react-native-paper';

import { Addiction } from '@/components/ui/Addiction';
import { useNotificationsBlacklistedStatus } from '@/hooks/notification';
import i18n from '@/i18n';
import {
  AchievementNotificationsManager,
  NotificationsBlacklistManager,
} from '@/services/managers/local';
import { useTheme } from '@/theme';

interface AchievementNotificationProps {
  addiction: Addiction;
  notifications: TriggerNotification[];
}

const AchievementNotification: FC<AchievementNotificationProps> = ({
  addiction,
  notifications,
}) => {
  const { colors } = useTheme();
  const { blacklisted, refresh } = useNotificationsBlacklistedStatus({
    addiction,
  });

  const handleButtonPress = useCallback(async () => {
    if (blacklisted) {
      await NotificationsBlacklistManager.remove(addiction.id);
      await AchievementNotificationsManager.scheduleAll(addiction);
    } else {
      await NotificationsBlacklistManager.add(addiction.id);
      await AchievementNotificationsManager.cancelAll(addiction);
    }

    await refresh();
  }, [addiction, blacklisted, refresh]);

  return (
    <Addiction>
      <Addiction.Image image={addiction.image} name={addiction.name} />
      <Addiction.Body>
        <Addiction.Name>{addiction.name}</Addiction.Name>
        <Text>
          {i18n.t(['screens', 'notifications', 'notificationsCount'], {
            count: notifications.length,
          })}
        </Text>
      </Addiction.Body>
      <Button
        onPress={handleButtonPress}
        mode="text"
        textColor={blacklisted ? colors.primary : colors.error}
        icon={blacklisted ? 'bell' : 'bell-off'}
      >
        {blacklisted ? i18n.t(['labels', 'on']) : i18n.t(['labels', 'off'])}
      </Button>
    </Addiction>
  );
};

export { AchievementNotification };

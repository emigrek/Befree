import { TriggerNotification } from '@notifee/react-native';
import { FC } from 'react';
import { Button, Text } from 'react-native-paper';

import { Addiction } from '@/components/ui/Addiction';
import {
  addAllNotifications,
  removeAllNotifications,
} from '@/hooks/goal/achievementsNotifications';
import i18n from '@/i18n';
import { useGlobalStore } from '@/store';
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
  const { addBlacklist, removeBlacklist, isBlacklisted } = useGlobalStore(
    state => ({
      addBlacklist: state.addBlacklist,
      removeBlacklist: state.removeBlacklist,
      isBlacklisted: state.isBlacklisted,
    }),
  );

  const handleButtonPress = () => {
    if (isBlacklisted(addiction.id)) {
      removeBlacklist(addiction.id);
      addAllNotifications({ addiction });
    } else {
      addBlacklist(addiction.id);
      removeAllNotifications({ addictionId: addiction.id });
    }
  };

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
        textColor={isBlacklisted(addiction.id) ? colors.primary : colors.error}
        icon={isBlacklisted(addiction.id) ? 'bell' : 'bell-off'}
      >
        {isBlacklisted(addiction.id)
          ? i18n.t(['labels', 'on'])
          : i18n.t(['labels', 'off'])}
      </Button>
    </Addiction>
  );
};

export { AchievementNotification };

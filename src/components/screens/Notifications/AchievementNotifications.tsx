import { TriggerNotification } from '@notifee/react-native';
import { FC, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { AchievementNotification } from './AchievementNotification';

import { Divider } from '@/components/ui/Divider';
import { Header } from '@/components/ui/Header';
import { useAchievementsNotifications } from '@/hooks/goal/useAchievementsNotifications';
import i18n from '@/i18n';

const AchievementNotifications: FC = () => {
  const notifications = useAchievementsNotifications();

  const renderItem = useCallback(
    ({
      item,
    }: {
      item: {
        addiction: Addiction;
        notifications: TriggerNotification[];
      };
    }) => <AchievementNotification {...item} />,
    [],
  );

  const renderDivider = useCallback(() => <Divider />, []);

  return (
    <>
      <Header
        title={i18n.t([
          'screens',
          'notifications',
          'achievementsNotifications',
        ])}
      />
      <FlatList
        data={notifications}
        ItemSeparatorComponent={renderDivider}
        renderItem={renderItem}
        keyExtractor={item => item.addiction.id}
      />
    </>
  );
};

export { AchievementNotifications };

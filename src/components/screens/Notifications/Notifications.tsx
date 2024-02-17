import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { AchievementNotifications } from './AchievementNotifications';
import { Permissions } from './Permissions';

import { Header } from '@/components/ui/Header';
import { Screen } from '@/components/ui/Screen';
import i18n from '@/i18n';
import { NotificationsScreenProps } from '@/navigation/types';

const NotificationsScreen: FC<NotificationsScreenProps> = () => {
  return (
    <Screen style={style.screen}>
      <Permissions />
      <Header
        title={i18n.t([
          'screens',
          'notifications',
          'achievementsNotifications',
        ])}
      />
      <AchievementNotifications />
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    gap: 40,
  },
});

export { NotificationsScreen };

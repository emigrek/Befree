import { FC, useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';

import { AchievementNotifications } from './AchievementNotifications';
import { Permissions } from './Permissions';

import { Screen } from '@/components/ui/Screen';
import { NotificationsScreenProps } from '@/navigation/types';

const Notifications: FC<NotificationsScreenProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => undefined,
    });
  }, [navigation]);

  return (
    <Screen style={style.screen}>
      <Permissions />
      <AchievementNotifications />
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    gap: 40,
  },
  text: {
    paddingHorizontal: 20,
  },
  switchItem: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export { Notifications };

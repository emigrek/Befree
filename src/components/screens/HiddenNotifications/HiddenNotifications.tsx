import { FC, useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';

import { AchievementNotifications } from '@/components/screens/Notifications/AchievementNotifications';
import { Screen } from '@/components/ui/Screen';
import { HiddenAddictionsNotificationsScreenProps } from '@/navigation/types';

const HiddenAddictionsNotifications: FC<
  HiddenAddictionsNotificationsScreenProps
> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => undefined,
    });
  }, [navigation]);

  return (
    <Screen style={style.screen}>
      <AchievementNotifications hidden />
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    gap: 40,
  },
});

export { HiddenAddictionsNotifications };

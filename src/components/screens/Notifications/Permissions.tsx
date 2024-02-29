import { AuthorizationStatus } from '@notifee/react-native';
import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

import { useNotificationsSettings } from '@/hooks/notification';
import i18n from '@/i18n';
import { useAddictionsStore } from '@/store';

const Permissions: FC = () => {
  const { notificationSettings, requestAuthorization } =
    useNotificationsSettings();
  const reloadNotifications = useAddictionsStore(
    state => state.reloadNotifications,
  );

  const onValueChange = useCallback(
    async (value: boolean) => {
      if (
        value &&
        notificationSettings?.authorizationStatus !==
          AuthorizationStatus.AUTHORIZED
      ) {
        const response = await requestAuthorization();

        if (response?.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
          await reloadNotifications();
        }
      }
    },
    [requestAuthorization, notificationSettings, reloadNotifications],
  );

  return (
    <View style={style.switchItem}>
      <Text variant={'titleMedium'}>
        {i18n.t(['screens', 'notifications', 'notificationsPermissions'])}
      </Text>
      <Switch
        value={
          notificationSettings?.authorizationStatus ===
          AuthorizationStatus.AUTHORIZED
        }
        onValueChange={onValueChange}
      />
    </View>
  );
};

const style = StyleSheet.create({
  switchItem: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export { Permissions };

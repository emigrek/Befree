import { AuthorizationStatus } from '@notifee/react-native';
import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

import { useNotificationsSettings } from '@/hooks/notification/useNotificationsSettings';
import i18n from '@/i18n';

const Permissions: FC = () => {
  const { notificationSettings, requestAuthorization } =
    useNotificationsSettings();

  const onValueChange = useCallback(
    (value: boolean) => {
      if (
        value &&
        notificationSettings?.authorizationStatus !==
          AuthorizationStatus.AUTHORIZED
      ) {
        requestAuthorization();
      }
    },
    [requestAuthorization, notificationSettings],
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

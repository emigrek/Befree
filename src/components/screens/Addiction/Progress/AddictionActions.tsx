import { useNavigation } from '@react-navigation/native';
import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import {
  addAllNotifications,
  removeAllNotifications,
} from '@/hooks/goal/achievementsNotifications';
import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';
import { relapseAddiction, removeAddiction } from '@/services/queries';
import { useAuthStore, useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

interface AddictionActionsProps {
  addiction: Addiction;
}

const AddictionActions: FC<AddictionActionsProps> = ({ addiction }) => {
  const { colors } = useTheme();
  const { id } = addiction;
  const user = useAuthStore(state => state.user);
  const navigation = useNavigation<ModalStackNavigationProp>();
  const {
    storeAddRelapse,
    storeRemoveRelapse,
    storeAdd,
    storeRemove,
    isBlacklisted: hasNotificationsBlacklisted,
    removeBlacklist: removeAddictionFromNotificationsBlacklist,
  } = useGlobalStore(state => ({
    storeAddRelapse: state.addRelapse,
    storeRemoveRelapse: state.removeRelapse,
    storeAdd: state.add,
    storeRemove: state.remove,
    isBlacklisted: state.isBlacklisted,
    removeBlacklist: state.removeBlacklist,
  }));

  const handleRelapse = useCallback(() => {
    const date = new Date();

    storeAddRelapse(addiction.id, date);

    if (!hasNotificationsBlacklisted(addiction.id)) {
      removeAllNotifications({ addictionId: addiction.id });
      addAllNotifications({ addiction });
    }

    if (!user) return;

    relapseAddiction({
      user,
      addiction,
    }).catch(() => {
      storeRemoveRelapse(addiction.id, date);
    });
  }, [
    user,
    addiction,
    storeAddRelapse,
    storeRemoveRelapse,
    hasNotificationsBlacklisted,
  ]);

  const handleRemove = useCallback(() => {
    navigation.navigate('BottomTabs', { screen: 'Addictions' });

    storeRemove(id);
    removeAllNotifications({ addictionId: addiction.id });
    removeAddictionFromNotificationsBlacklist(addiction.id);

    if (!user) return;

    removeAddiction({
      user,
      id,
    }).catch(() => {
      storeAdd(addiction);
    });
  }, [
    user,
    addiction,
    id,
    storeRemove,
    storeAdd,
    navigation,
    removeAddictionFromNotificationsBlacklist,
  ]);

  return (
    <View style={style.buttonContainer}>
      <Button
        style={style.button}
        contentStyle={style.buttonContent}
        mode="contained"
        icon="restart"
        onPress={handleRelapse}
      >
        {i18n.t(['labels', 'relapse'])}
      </Button>
      <Button
        style={style.button}
        contentStyle={style.buttonContent}
        mode="text"
        icon="trash-can"
        rippleColor={colors.error}
        labelStyle={{
          color: colors.text,
        }}
        onPress={handleRemove}
      >
        {i18n.t(['labels', 'remove'])}
      </Button>
    </View>
  );
};

export { AddictionActions };

const style = StyleSheet.create({
  button: {
    flex: 1,
    height: 55,
  },
  buttonContent: {
    height: 55,
  },
  buttonContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 20,
  },
});

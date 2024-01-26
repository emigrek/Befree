import { useNavigation } from '@react-navigation/native';
import { customAlphabet } from 'nanoid/non-secure';
import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import {
  addAllNotifications,
  removeAllNotifications,
} from '@/hooks/goal/achievementsNotifications';
import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';
import { createRelapse, removeAddiction } from '@/services/queries';
import { useAuthStore, useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

interface AddictionActionsProps {
  addiction: Addiction;
}

const AddictionActions: FC<AddictionActionsProps> = ({ addiction }) => {
  const { colors } = useTheme();
  const { id } = addiction;
  const user = useAuthStore(state => state.user);
  const navigation = useNavigation<ModalStackNavigationProp>();
  const {
    storeAddAddiction,
    storeRemoveAddiction,
    isBlacklisted: hasNotificationsBlacklisted,
    removeBlacklist: removeAddictionFromNotificationsBlacklist,
  } = useGlobalStore(state => ({
    storeAddAddiction: state.addAddiction,
    storeRemoveAddiction: state.removeAddiction,
    storeAddRelapse: state.addRelapse,
    isBlacklisted: state.isBlacklisted,
    removeBlacklist: state.removeBlacklist,
  }));

  const handleRelapse = useCallback(() => {
    if (!user) return;

    if (!hasNotificationsBlacklisted(addiction.id)) {
      removeAllNotifications({ addictionId: addiction.id });
      addAllNotifications({ addiction });
    }

    const id = nanoid();

    createRelapse({
      user,
      relapse: {
        id,
        addictionId: addiction.id,
        createdAt: new Date(),
      },
    });
  }, [user, addiction, hasNotificationsBlacklisted]);

  const handleRemove = useCallback(() => {
    navigation.navigate('BottomTabs', { screen: 'Addictions' });

    storeRemoveAddiction(id);
    removeAllNotifications({ addictionId: addiction.id });
    removeAddictionFromNotificationsBlacklist(addiction.id);

    if (!user) return;

    removeAddiction({
      user,
      id,
    }).catch(() => {
      storeAddAddiction(addiction);
    });
  }, [
    user,
    addiction,
    id,
    storeRemoveAddiction,
    storeAddAddiction,
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

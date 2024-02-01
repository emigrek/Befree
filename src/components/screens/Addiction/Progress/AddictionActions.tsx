import { useNavigation } from '@react-navigation/native';
import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import {
  addAllNotifications,
  removeAllNotifications,
} from '@/hooks/goal/achievementsNotifications';
import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';
import UserData from '@/services/data/userData';
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
    storeAddAddiction,
    storeRemoveAddiction,
    isBlacklisted: hasNotificationsBlacklisted,
    removeBlacklist: removeAddictionFromNotificationsBlacklist,
  } = useGlobalStore(state => ({
    storeAddAddiction: state.addAddiction,
    storeRemoveAddiction: state.removeAddiction,
    isBlacklisted: state.isBlacklisted,
    removeBlacklist: state.removeBlacklist,
  }));

  const [isRelapsing, setIsRelapsing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRelapse = useCallback(() => {
    if (!user) return;
    setIsRelapsing(true);
    const { relapses } = new UserData(user.uid);

    relapses
      .create({
        addictionId: addiction.id,
        relapseAt: new Date(),
      })
      .then(() => {
        setIsRelapsing(false);

        if (!hasNotificationsBlacklisted(addiction.id)) {
          removeAllNotifications({ addictionId: addiction.id });
          addAllNotifications({ addiction });
        }
      });
  }, [user, addiction, hasNotificationsBlacklisted]);

  const handleRemove = useCallback(() => {
    if (!user) return;

    setIsDeleting(true);

    navigation.navigate('BottomTabs', { screen: 'Addictions' });

    storeRemoveAddiction(id);
    removeAllNotifications({ addictionId: addiction.id });
    removeAddictionFromNotificationsBlacklist(addiction.id);

    const { addictions } = new UserData(user.uid);

    addictions
      .delete(id)
      .then(() => {
        setIsDeleting(false);
      })
      .catch(() => {
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
        loading={isRelapsing}
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
        loading={isDeleting}
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

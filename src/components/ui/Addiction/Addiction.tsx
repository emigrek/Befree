import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { Menu, Text, TouchableRipple, useTheme } from 'react-native-paper';

import { AbsenceIndicator } from './AbsenceIndicator';
import { Goal } from './Goal';
import { Image } from './Image';
import { style } from './style';
import { useLongPressMenu } from './useLongPressMenu';

import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';
import { relapseAddiction, removeAddiction } from '@/services/firestore';
import { useAuthStore, useGlobalStore } from '@/store';

const ITEM_HEIGHT = 100;

const Addiction: FC<Addiction> = addiction => {
  const { image, name, id } = addiction;
  const { colors } = useTheme();

  const { visible, showMenu, hideMenu, anchor } = useLongPressMenu();
  const { storeAddRelapse, storeRemoveRelapse, storeAdd, storeRemove } =
    useGlobalStore(state => ({
      storeAddRelapse: state.addRelapse,
      storeRemoveRelapse: state.removeRelapse,
      storeAdd: state.add,
      storeRemove: state.remove,
    }));
  const user = useAuthStore(state => state.user);

  const navigation = useNavigation<ModalStackNavigationProp>();

  const handleAddictionPress = useCallback(() => {
    navigation.navigate('Addiction', { id });
  }, [navigation, id]);

  const handleLongPress = useCallback(
    (event: GestureResponderEvent) => {
      showMenu(event.nativeEvent.pageX, event.nativeEvent.pageY);
    },
    [showMenu],
  );

  const handleRelapse = useCallback(() => {
    if (!user) return;
    const date = new Date();

    hideMenu();
    storeAddRelapse(addiction.id, date);
    relapseAddiction({
      user,
      addiction,
    }).catch(() => {
      storeRemoveRelapse(addiction.id, date);
    });
  }, [user, addiction, hideMenu, storeAddRelapse, storeRemoveRelapse]);

  const handleRemove = useCallback(() => {
    if (!user) return;

    hideMenu();
    storeRemove(id);
    removeAddiction({
      user,
      id,
    }).catch(() => {
      storeAdd(addiction);
    });
  }, [user, id, hideMenu, storeRemove, storeAdd, addiction]);

  return (
    <>
      <TouchableRipple
        rippleColor={colors.onSecondary}
        onPress={handleAddictionPress}
        onLongPress={handleLongPress}
        style={[
          { height: ITEM_HEIGHT },
          visible && {
            backgroundColor: colors.onSecondary,
          },
        ]}
      >
        <View style={[style.surface]}>
          <Image image={image} name={name} />
          <View style={style.textContainer}>
            <Text variant={'titleSmall'}>{name}</Text>
            <View style={style.details}>
              <AbsenceIndicator
                addiction={addiction}
                style={{ color: colors.primary }}
                variant={'titleLarge'}
              />
              <Goal addiction={addiction} />
            </View>
          </View>
        </View>
      </TouchableRipple>
      <Menu
        visible={visible}
        onDismiss={hideMenu}
        contentStyle={{ backgroundColor: colors.background }}
        anchorPosition="top"
        anchor={anchor}
      >
        <Menu.Item
          leadingIcon={'restart'}
          onPress={handleRelapse}
          title={i18n.t(['labels', 'relapse'])}
        />
        <Menu.Item
          leadingIcon={'delete'}
          titleStyle={{ color: colors.error }}
          onPress={handleRemove}
          title={i18n.t(['labels', 'remove'])}
        />
      </Menu>
    </>
  );
};

export { Addiction, ITEM_HEIGHT };

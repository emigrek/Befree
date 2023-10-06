import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { Menu, Text, TouchableRipple, useTheme } from 'react-native-paper';

import { FreeFor } from './FreeFor';
import { Image } from './Image';
import { Progress } from './Progress';
import { style } from './style';
import { useLongPressMenu } from './useLongPressMenu';

import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';
import { relapse, remove } from '@/services/firestore';
import { useAuthStore } from '@/store';

const Addiction: FC<Addiction> = addiction => {
  const { image, name, id } = addiction;
  const { colors } = useTheme();

  const { visible, showMenu, hideMenu, anchor } = useLongPressMenu();
  const user = useAuthStore(state => state.user);

  const navigation = useNavigation<ModalStackNavigationProp>();

  const handleAddictionPress = () => {
    navigation.navigate('Addiction', { id });
  };

  const handleLongPress = useCallback(
    (event: GestureResponderEvent) => {
      showMenu(event.nativeEvent.pageX, event.nativeEvent.pageY);
    },
    [showMenu],
  );

  const handleRelapse = useCallback(() => {
    if (!user) return;

    relapse({
      user,
      id,
    });
    hideMenu();
  }, [user, id, hideMenu]);

  const handleRemove = useCallback(() => {
    if (!user) return;

    remove({
      user,
      id,
    });
    hideMenu();
  }, [user, id, hideMenu]);

  return (
    <>
      <TouchableRipple
        rippleColor={colors.onSecondary}
        onPress={handleAddictionPress}
        onLongPress={handleLongPress}
        style={[
          style.surface,
          visible && {
            backgroundColor: colors.onSecondary,
          },
        ]}
      >
        <>
          <Image image={image} name={name} />
          <View style={style.textContainer}>
            <Text variant={'titleSmall'}>{name}</Text>
            <View style={style.details}>
              <FreeFor
                style={{ color: colors.primary }}
                variant={'titleLarge'}
                addiction={addiction}
              />
              <Progress addiction={addiction} />
            </View>
          </View>
        </>
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

export { Addiction };

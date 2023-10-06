import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { Menu, Text, TouchableRipple, useTheme } from 'react-native-paper';

import { Image } from './Image';
import { Progress } from './Progress';
import { style } from './style';
import { useLongPressMenu } from './useLongPressMenu';

import { Bold } from '@/components/ui/Text';
import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';
import { useAddiction } from '@/services/firestore';

// interface AddictionProps extends Omit<TouchableRippleProps, 'children'> {
//   addiction: Addiction;
// }

const Addiction: FC<Addiction> = addiction => {
  const { image, name, id } = addiction;
  const { colors } = useTheme();

  const { visible, showMenu, hideMenu, anchor } = useLongPressMenu();
  const { freeFor, relapse, lastRelapse } = useAddiction(addiction);

  const navigation = useNavigation<ModalStackNavigationProp>();

  const handleAddictionPress = () => {
    navigation.navigate('Addiction', { id });
  };

  const handleLongPress = (event: GestureResponderEvent) => {
    showMenu(event.nativeEvent.pageX, event.nativeEvent.pageY);
  };

  const handleRelapse = () => {
    relapse();
    hideMenu();
  };

  return (
    <>
      <TouchableRipple
        rippleColor={colors.onSecondary}
        onPress={handleAddictionPress}
        onLongPress={handleLongPress}
        style={[
          style.surface,
          visible && {
            backgroundColor: colors.onPrimaryContainer + '20',
          },
        ]}
      >
        <>
          <Image image={image} name={name} />
          <View style={style.textContainer}>
            <Text variant={'titleSmall'}>{name}</Text>
            <View style={style.details}>
              <Bold variant="titleLarge" style={{ color: colors.primary }}>
                {freeFor()}
              </Bold>
              <Progress date={lastRelapse} />
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
          titleStyle={{ color: colors.error }}
          onPress={handleRelapse}
          title={i18n.t(['labels', 'relapse'])}
        />
      </Menu>
    </>
  );
};

export { Addiction };

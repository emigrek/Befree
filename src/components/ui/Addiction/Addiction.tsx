import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { AbsenceIndicator } from './AbsenceIndicator';
import { Goal } from './Goal';
import { Image } from './Image';
import { style } from './style';

import { useAbsenceTime } from '@/hooks/addiction/useAbsenceTime';
import { useSelected } from '@/hooks/selection/useSelected';
import { ModalStackNavigationProp } from '@/navigation/types';

const ITEM_HEIGHT = 98;

const Addiction: FC<Addiction> = addiction => {
  const { image, name, lastRelapse, id } = addiction;
  const { colors } = useTheme();
  const { absenceTime } = useAbsenceTime({ addiction });
  // const lastRelapse = useLastRelapse({ addiction });
  const { isSelected, toggleSelected } = useSelected({ id });

  const navigation = useNavigation<ModalStackNavigationProp>();

  const handleAddictionPress = useCallback(() => {
    navigation.navigate('Addiction', {
      id,
    });
  }, [navigation, id]);

  const handleLongPress = useCallback(() => {
    toggleSelected();
  }, [toggleSelected]);

  const addictionStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: isSelected ? colors.secondaryContainer : 'transparent',
    };
  }, [isSelected]);

  return (
    <TouchableRipple
      rippleColor={colors.secondaryContainer}
      onPress={handleAddictionPress}
      onLongPress={handleLongPress}
    >
      <Animated.View
        style={[
          style.surface,
          addictionStyle,
          {
            height: ITEM_HEIGHT,
          },
        ]}
      >
        <Image image={image} name={name} />
        <View style={style.textContainer}>
          <Text variant={'titleSmall'}>{name}</Text>
          <View style={style.details}>
            <AbsenceIndicator
              absenceTime={absenceTime}
              style={{ color: colors.primary }}
              variant={'titleLarge'}
            />
            <Goal absenceTime={absenceTime} lastRelapse={lastRelapse} />
          </View>
        </View>
      </Animated.View>
    </TouchableRipple>
  );
};

export { Addiction, ITEM_HEIGHT };

import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { AbsenceIndicator } from './AbsenceIndicator';
import { Goal } from './Goal';
import { Image } from './Image';
import { style } from './style';

import { TouchableRipple } from '@/components/ui/TouchableRipple';
import { useAbsenceTime } from '@/hooks/addiction/useAbsenceTime';
import { useSelected } from '@/hooks/selection/useSelected';
import { ModalStackNavigationProp } from '@/navigation/types';

const AnimatedTouchableRipple =
  Animated.createAnimatedComponent(TouchableRipple);

const Addiction: FC<Addiction> = addiction => {
  const { image, name, lastRelapse, id } = addiction;
  const { colors } = useTheme();
  const { absenceTime } = useAbsenceTime({ addiction });
  const { isSelected, toggleSelected } = useSelected({ id });

  const navigation = useNavigation<ModalStackNavigationProp>();

  const handleAddictionPress = useCallback(() => {
    navigation.navigate('Addiction', {
      screen: 'Progress',
      params: { id },
    });
  }, [navigation, id]);

  const handleLongPress = useCallback(() => {
    toggleSelected();
  }, [toggleSelected]);

  const addictionStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isSelected ? colors.secondaryContainer : 'transparent',
      ),
    };
  }, [isSelected]);

  return (
    <AnimatedTouchableRipple
      rippleColor={colors.secondaryContainer}
      onPress={handleAddictionPress}
      onLongPress={handleLongPress}
      delayLongPress={100}
      style={[style.surface, addictionStyle]}
    >
      <>
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
      </>
    </AnimatedTouchableRipple>
  );
};

export { Addiction };

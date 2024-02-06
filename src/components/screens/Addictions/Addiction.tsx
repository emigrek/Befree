import { useNavigation } from '@react-navigation/native';
import { differenceInMilliseconds } from 'date-fns';
import React, { FC, useCallback, useMemo } from 'react';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Addiction as AddictionPrimitive } from '@/components/ui/Addiction';
import { TouchableRipple } from '@/components/ui/TouchableRipple';
import { useAbsenceDuration } from '@/hooks/addiction/useAbsenceDuration';
import { useGoal } from '@/hooks/goal/useGoal';
import { useAddictionLastRelapse } from '@/hooks/relapse/useAddictionLastRelapse';
import { useSelected } from '@/hooks/selection/useSelected';
import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';
import { useTheme } from '@/theme';

const AnimatedTouchableRipple =
  Animated.createAnimatedComponent(TouchableRipple);

type AddictionProps = {
  addiction: Addiction;
};

const Addiction: FC<AddictionProps> = ({ addiction }) => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const { colors } = useTheme();

  const { time, duration } = useAbsenceDuration({ addiction });
  const { isSelected, toggleSelected, selected } = useSelected({
    id: addiction.id,
  });
  const lastRelapse = useAddictionLastRelapse({ addiction });
  const goal = useGoal(lastRelapse);

  const progress = useMemo(() => {
    const total = differenceInMilliseconds(goal.goalAt, lastRelapse);
    return Math.min(time / total, 1);
  }, [time, lastRelapse, goal]);

  const handleAddictionPress = useCallback(() => {
    if (selected.length) {
      toggleSelected();
      return;
    }

    navigation.navigate('Addiction', {
      id: addiction.id,
    });
  }, [navigation, addiction.id, selected, toggleSelected]);

  const handleLongPress = useCallback(() => {
    if (selected.length) return;

    toggleSelected();
  }, [toggleSelected, selected]);

  const addictionStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isSelected ? colors.surfaceVariant : 'transparent',
      ),
    };
  }, [isSelected, colors]);

  return (
    <AnimatedTouchableRipple
      rippleColor={colors.surfaceVariant}
      onPress={handleAddictionPress}
      onLongPress={handleLongPress}
      delayLongPress={100}
      style={addictionStyle}
    >
      <AddictionPrimitive>
        <AddictionPrimitive.Image
          image={addiction.image}
          name={addiction.name}
        />
        <AddictionPrimitive.Body>
          <AddictionPrimitive.Name>{addiction.name}</AddictionPrimitive.Name>
          <AddictionPrimitive.CountUp
            variant="titleLarge"
            duration={duration}
          />
          <AddictionPrimitive.Goal>
            <AddictionPrimitive.Goal.Label
              style={{ fontWeight: 'bold', color: colors.text }}
            >
              {i18n.t(['labels', 'goal']).toUpperCase()}
            </AddictionPrimitive.Goal.Label>
            {goal && (
              <AddictionPrimitive.Goal.Progress>
                <AddictionPrimitive.Goal.Progress.Text
                  style={{ color: colors.outline }}
                >
                  {i18n.t(['goals', goal.goalType]).toUpperCase()}
                </AddictionPrimitive.Goal.Progress.Text>
                <AddictionPrimitive.Goal.Progress.Bar
                  progress={progress}
                  color={colors.primary}
                />
                <AddictionPrimitive.Goal.Progress.Text
                  style={{ color: colors.outline }}
                >
                  {(progress * 100).toFixed(0)}%
                </AddictionPrimitive.Goal.Progress.Text>
              </AddictionPrimitive.Goal.Progress>
            )}
          </AddictionPrimitive.Goal>
        </AddictionPrimitive.Body>
      </AddictionPrimitive>
    </AnimatedTouchableRipple>
  );
};

export { Addiction };

import { useNavigation } from '@react-navigation/native';
import { differenceInMilliseconds } from 'date-fns';
import React, { FC, useCallback, useMemo } from 'react';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Addiction as AddictionPrimitive } from '@/components/ui/Addiction';
import { TouchableRipple } from '@/components/ui/TouchableRipple';
import { useAbsenceTime } from '@/hooks/addiction/useAbsenceTime';
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

  const { absenceTime } = useAbsenceTime({ addiction });
  const { isSelected, toggleSelected, selected } = useSelected({
    id: addiction.id,
  });
  const lastRelapse = useAddictionLastRelapse({ addiction });
  const goal = useGoal(lastRelapse);

  const progress = useMemo(() => {
    if (!goal || !lastRelapse) return 0;
    const total = differenceInMilliseconds(goal.goalAt, lastRelapse);
    return absenceTime / total;
  }, [absenceTime, lastRelapse, goal]);

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
      style={addictionStyle}
    >
      <AddictionPrimitive>
        <AddictionPrimitive.Image
          image={addiction.image}
          name={addiction.name}
        />
        <AddictionPrimitive.Body>
          <AddictionPrimitive.Name>{addiction.name}</AddictionPrimitive.Name>
          <AddictionPrimitive.CountUp variant="titleLarge" time={absenceTime} />
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

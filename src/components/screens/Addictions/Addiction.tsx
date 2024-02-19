import { useNavigation } from '@react-navigation/native';
import { differenceInMilliseconds } from 'date-fns';
import React, { FC, useCallback, useMemo } from 'react';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { Addiction as AddictionPrimitive } from '@/components/ui/Addiction';
import { AnimatedTouchableRipple } from '@/components/ui/TouchableRipple';
import { useAbstinenceDuration } from '@/hooks/addiction';
import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';
import { useAddictionsSelectionStore } from '@/store';
import { Addiction as AddictionType, GoalManager } from '@/structures';
import { useTheme } from '@/theme';

type AddictionProps = {
  addiction: AddictionType;
};

const Addiction: FC<AddictionProps> = ({ addiction }) => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const { colors } = useTheme();

  const { time, duration } = useAbstinenceDuration({ addiction });
  const { isSelected, toggleSelected, selected } = useAddictionsSelectionStore(
    state => ({
      isSelected: state.isSelected(addiction),
      toggleSelected: state.toggle,
      selected: state.selected,
    }),
  );
  const goal = GoalManager.getGoal(new Date(addiction.lastRelapse.relapseAt));

  const progress = useMemo(() => {
    const total = differenceInMilliseconds(
      goal.goalAt,
      new Date(addiction.lastRelapse.relapseAt),
    );
    return Math.min(time / total, 1);
  }, [time, addiction, goal]);

  const handleAddictionPress = useCallback(() => {
    if (selected.length) {
      toggleSelected(addiction);
      return;
    }

    navigation.navigate('Addiction', {
      addictionId: addiction.id,
    });
  }, [navigation, selected, toggleSelected, addiction]);

  const handleLongPress = useCallback(() => {
    if (selected.length) return;

    toggleSelected(addiction);
  }, [toggleSelected, selected, addiction]);

  const addictionStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isSelected ? colors.surfaceVariant : 'transparent',
      ),
    };
  }, [isSelected, colors]);

  return (
    <AnimatedTouchableRipple
      onPress={handleAddictionPress}
      onLongPress={handleLongPress}
      rippleColor={colors.elevation.level3}
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

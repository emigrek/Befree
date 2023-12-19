import { differenceInMilliseconds } from 'date-fns';
import React, { FC, useMemo } from 'react';

import { Addiction as AddictionPrimitive } from '@/components/ui/Addiction';
import { useAbsenceTime } from '@/hooks/addiction/useAbsenceTime';
import { useGoal } from '@/hooks/goal/useGoal';
import i18n from '@/i18n';
import { useTheme } from '@/theme';

interface GoalProgressProps {
  addiction: Addiction;
}

const GoalProgress: FC<GoalProgressProps> = ({ addiction }) => {
  const { colors } = useTheme();
  const { absenceTime } = useAbsenceTime({ addiction });
  const goal = useGoal(new Date(addiction.lastRelapse));

  const progress = useMemo(() => {
    const total = differenceInMilliseconds(
      goal.goalAt,
      new Date(addiction.lastRelapse),
    );

    return absenceTime / total;
  }, [absenceTime, goal.goalAt, addiction.lastRelapse]);

  return (
    <AddictionPrimitive.Goal
      style={{
        paddingHorizontal: 20,
      }}
    >
      <AddictionPrimitive.Goal.Label
        variant={'bodyMedium'}
        style={{ fontWeight: 'bold', color: colors.text }}
      >
        {i18n.t(['labels', 'goal'])}
      </AddictionPrimitive.Goal.Label>
      <AddictionPrimitive.Goal.Progress>
        <AddictionPrimitive.Goal.Progress.Text
          style={{ color: colors.onSurfaceVariant }}
        >
          {i18n.t(['goals', goal.goalType]).toUpperCase()}
        </AddictionPrimitive.Goal.Progress.Text>
        <AddictionPrimitive.Goal.Progress.Bar
          progress={progress}
          color={colors.primary}
        />
        <AddictionPrimitive.Goal.Progress.Text
          style={{ color: colors.onSurfaceVariant }}
        >
          {(progress * 100).toFixed(0)}%
        </AddictionPrimitive.Goal.Progress.Text>
      </AddictionPrimitive.Goal.Progress>
    </AddictionPrimitive.Goal>
  );
};

export { GoalProgress };

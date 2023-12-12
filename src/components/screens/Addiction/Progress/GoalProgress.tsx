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
        paddingVertical: 20,
        borderTopColor: colors.border,
        borderTopWidth: 1,
      }}
    >
      <AddictionPrimitive.Goal.Label
        style={{ fontWeight: 'bold', color: colors.outline }}
      >
        {i18n.t(['labels', 'goal']).toUpperCase()}
      </AddictionPrimitive.Goal.Label>
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
          {progress.toFixed(2)}%
        </AddictionPrimitive.Goal.Progress.Text>
      </AddictionPrimitive.Goal.Progress>
    </AddictionPrimitive.Goal>
  );
};

export { GoalProgress };

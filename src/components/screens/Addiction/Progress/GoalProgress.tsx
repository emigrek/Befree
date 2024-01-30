import { differenceInMilliseconds } from 'date-fns';
import React, { FC, useMemo } from 'react';

import { Addiction as AddictionPrimitive } from '@/components/ui/Addiction';
import { useAbsenceTime } from '@/hooks/addiction/useAbsenceTime';
import { useGoal } from '@/hooks/goal/useGoal';
import { useAddictionLastRelapse } from '@/hooks/relapse/useAddictionLastRelapse';
import i18n from '@/i18n';
import { useTheme } from '@/theme';

interface GoalProgressProps {
  addiction: Addiction;
}

const GoalProgress: FC<GoalProgressProps> = ({ addiction }) => {
  const { colors } = useTheme();
  const { absenceTime } = useAbsenceTime({ addiction });
  const lastRelapse = useAddictionLastRelapse({ addiction });
  const goal = useGoal(lastRelapse);

  const progress = useMemo(() => {
    if (!goal || !lastRelapse) return 0;
    const total = differenceInMilliseconds(goal.goalAt, lastRelapse);
    return absenceTime / total;
  }, [absenceTime, lastRelapse, goal]);

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
      {goal && (
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
      )}
    </AddictionPrimitive.Goal>
  );
};

export { GoalProgress };

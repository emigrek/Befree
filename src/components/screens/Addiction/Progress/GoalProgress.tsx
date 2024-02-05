import { differenceInMilliseconds } from 'date-fns';
import React, { FC, useMemo } from 'react';

import { Addiction as AddictionPrimitive } from '@/components/ui/Addiction';
import { useAbsenceDuration } from '@/hooks/addiction/useAbsenceDuration';
import { useGoal } from '@/hooks/goal/useGoal';
import { useAddictionLastRelapse } from '@/hooks/relapse/useAddictionLastRelapse';
import i18n from '@/i18n';
import { useTheme } from '@/theme';

interface GoalProgressProps {
  addiction: Addiction;
}

const GoalProgress: FC<GoalProgressProps> = ({ addiction }) => {
  const { colors } = useTheme();
  const { time } = useAbsenceDuration({ addiction });
  const lastRelapse = useAddictionLastRelapse({ addiction });
  const goal = useGoal(lastRelapse);

  const progress = useMemo(() => {
    const total = differenceInMilliseconds(goal.goalAt, lastRelapse);
    return Math.min(time / total, 1);
  }, [time, lastRelapse, goal]);

  if (!goal) {
    return null;
  }

  return (
    <AddictionPrimitive.Goal>
      <AddictionPrimitive.Goal.Progress
        style={{ flex: 1, justifyContent: 'center' }}
      >
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

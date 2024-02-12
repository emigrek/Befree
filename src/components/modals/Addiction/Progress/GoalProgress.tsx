import { differenceInMilliseconds } from 'date-fns';
import React, { FC, useMemo } from 'react';

import { Addiction as AddictionPrimitive } from '@/components/ui/Addiction';
import { useAbstinenceDuration } from '@/hooks/addiction';
import { useAddictionLastRelapse } from '@/hooks/relapse';
import i18n from '@/i18n';
import { GoalManager } from '@/services/managers/local';
import { useTheme } from '@/theme';

interface GoalProgressProps {
  addiction: Addiction;
}

const GoalProgress: FC<GoalProgressProps> = ({ addiction }) => {
  const { colors } = useTheme();
  const { time } = useAbstinenceDuration({ addiction });
  const lastRelapse = useAddictionLastRelapse({ addiction });
  const goal = GoalManager.getGoal(lastRelapse);

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
    </AddictionPrimitive.Goal>
  );
};

export { GoalProgress };

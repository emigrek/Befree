import React, { FC } from 'react';

import { Addiction as AddictionPrimitive } from '@/components/ui/Addiction';
import i18n from '@/i18n';
import { Addiction } from '@/structures';
import { useTheme } from '@/theme';

interface GoalProgressProps {
  addiction: Addiction;
}

const GoalProgress: FC<GoalProgressProps> = ({ addiction }) => {
  const { colors } = useTheme();
  const { goal, progress } = addiction.goals;

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

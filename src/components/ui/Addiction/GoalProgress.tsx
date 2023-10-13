import { differenceInMilliseconds } from 'date-fns';
import { FC, useMemo } from 'react';
import { View } from 'react-native';
import { ProgressBar, ProgressBarProps, Text } from 'react-native-paper';

import { style } from './style';

import i18n from '@/i18n';
import { useTheme } from '@/theme';
import { getGoal } from '@/utils';

interface GoalProgressProps extends ProgressBarProps {
  lastRelapse: Date;
  absenceTime: number;
}

const GoalProgress: FC<GoalProgressProps> = ({
  lastRelapse,
  absenceTime,
  style: progressStyle,
  ...props
}) => {
  const { colors } = useTheme();
  const goal = getGoal(lastRelapse);

  const progress = useMemo(() => {
    const total = differenceInMilliseconds(goal.goalAt, new Date(lastRelapse));

    return absenceTime / total;
  }, [absenceTime, goal.goalAt, lastRelapse]);

  return (
    <View style={style.goalProgressContainer}>
      <Text variant="labelSmall" style={{ color: colors.outline }}>
        {i18n
          .t(['screens', 'addictions', 'goalTypes', goal.goalType])
          .toUpperCase()}
      </Text>
      <ProgressBar
        style={[style.progress, progressStyle]}
        progress={progress}
        {...props}
      />
      <Text variant="labelSmall" style={{ color: colors.outline }}>
        {(progress * 100).toFixed(2)}%
      </Text>
    </View>
  );
};

export { GoalProgress };

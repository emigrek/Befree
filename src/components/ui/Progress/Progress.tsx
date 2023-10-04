import { differenceInMilliseconds } from 'date-fns';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';

import { style } from '../Addiction/style';

import i18n from '@/i18n';
import { getGoal } from '@/services/firestore';
import { useTheme } from '@/theme';

const Progress = ({ startDate }: { startDate: Date }) => {
  const { colors } = useTheme();

  const goal = useMemo(() => {
    return getGoal(startDate);
  }, [startDate]);

  const progress = useMemo(() => {
    const { goalAt } = goal;

    const diff = differenceInMilliseconds(new Date(), startDate);
    const total = differenceInMilliseconds(goalAt, startDate);

    return diff / total;
  }, [startDate, goal]);

  return (
    <View style={style.progressContainer}>
      <Text variant="labelSmall" style={{ color: colors.outline }}>
        {i18n
          .t(['screens', 'addictions', 'goalTypes', goal.goalType])
          .toUpperCase()}
      </Text>
      <View style={style.progress}>
        <ProgressBar
          progress={progress}
          style={{ height: 10, borderRadius: 4 }}
        />
      </View>
      <Text variant="labelSmall" style={{ color: colors.outline }}>
        {(progress * 100).toFixed()}%
      </Text>
    </View>
  );
};

export { Progress };

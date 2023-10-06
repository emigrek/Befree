import { differenceInMilliseconds } from 'date-fns';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ProgressBar, Surface, Text } from 'react-native-paper';

import { style } from './style';

import i18n from '@/i18n';

const Goal = ({ date, goal }: { date: Date; goal: Goal }) => {
  const progress = useMemo(() => {
    const { goalAt } = goal;

    const diff = differenceInMilliseconds(new Date(), date);
    const total = differenceInMilliseconds(goalAt, date);

    return diff / total;
  }, [date, goal]);

  return (
    <Surface elevation={0} style={style.progressDetails}>
      <Text variant="labelSmall">
        {i18n
          .t(['screens', 'addictions', 'goalTypes', goal.goalType])
          .toUpperCase()}
      </Text>
      <View style={style.progress}>
        <ProgressBar progress={progress} style={style.progress} />
      </View>
      <Text variant="labelSmall">{(progress * 100).toFixed()}%</Text>
      {progress >= 1 && <Text variant="labelSmall">🎉</Text>}
    </Surface>
  );
};

export { Goal };

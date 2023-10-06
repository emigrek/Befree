import { differenceInMilliseconds } from 'date-fns';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ProgressBar, Surface, Text } from 'react-native-paper';

import { style } from './style';

import i18n from '@/i18n';
import { useFreeFor, useLastRelapse } from '@/services/firestore';

const Goal = ({ addiction, goal }: { addiction: Addiction; goal: Goal }) => {
  const { freeForTime } = useFreeFor({
    addiction,
  });
  const lastRelapse = useLastRelapse(addiction);

  const progress = useMemo(() => {
    const total = differenceInMilliseconds(goal.goalAt, lastRelapse);

    return freeForTime / total;
  }, [freeForTime, goal.goalAt, lastRelapse]);

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
      <Text variant="labelSmall">{(progress * 100).toFixed(2)}%</Text>
      {progress >= 1 && <Text variant="labelSmall">🎉</Text>}
    </Surface>
  );
};

export { Goal };

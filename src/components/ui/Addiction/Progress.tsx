import React, { useMemo } from 'react';
import { View } from 'react-native';

import { Goal } from './Goal';
import { style } from './style';

import { Bold } from '@/components/ui/Text';
import i18n from '@/i18n';
import { getGoal } from '@/services/firestore';

const Progress = ({ date }: { date: Date }) => {
  const goal = useMemo(() => {
    return getGoal(date);
  }, [date]);

  return (
    <View style={style.progressContainer}>
      <Bold variant="labelSmall">
        {i18n.t(['labels', 'goal']).toUpperCase()}
      </Bold>
      <View style={style.progressGoal}>
        <Goal goal={goal} date={date} />
      </View>
    </View>
  );
};

export { Progress };

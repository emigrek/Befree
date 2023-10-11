import React, { FC } from 'react';
import { View } from 'react-native';

import { GoalProgress } from './GoalProgress';
import { style } from './style';

import { Bold } from '@/components/ui/Text';
import i18n from '@/i18n';

interface GoalProps {
  lastRelapse: Date;
  absenceTime: number;
}

const Goal: FC<GoalProps> = ({ lastRelapse, absenceTime }) => {
  return (
    <View style={style.progressContainer}>
      <Bold variant="labelSmall">
        {i18n.t(['labels', 'goal']).toUpperCase()}
      </Bold>
      <View style={style.progressGoal}>
        <GoalProgress lastRelapse={lastRelapse} absenceTime={absenceTime} />
      </View>
    </View>
  );
};

export { Goal };

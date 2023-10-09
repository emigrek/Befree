import React, { FC } from 'react';
import { View } from 'react-native';

import { GoalProgress } from './GoalProgress';
import { style } from './style';

import { Bold } from '@/components/ui/Text';
import i18n from '@/i18n';

interface GoalProps {
  addiction: Addiction;
  refresh?: boolean;
}

const Goal: FC<GoalProps> = ({ addiction, refresh }) => {
  return (
    <View style={style.progressContainer}>
      <Bold variant="labelSmall">
        {i18n.t(['labels', 'goal']).toUpperCase()}
      </Bold>
      <View style={style.progressGoal}>
        <GoalProgress refresh={refresh} addiction={addiction} />
      </View>
    </View>
  );
};

export { Goal };

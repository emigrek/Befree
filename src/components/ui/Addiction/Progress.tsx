import React, { useMemo } from 'react';
import { View } from 'react-native';

import { Goal } from './Goal';
import { style } from './style';

import { Bold } from '@/components/ui/Text';
import i18n from '@/i18n';
import { getGoal, useLastRelapse } from '@/services/firestore';

const Progress = ({ addiction }: { addiction: Addiction }) => {
  const lastRelapse = useLastRelapse(addiction);

  const goal = useMemo(() => {
    return getGoal(lastRelapse);
  }, [lastRelapse]);

  return (
    <View style={style.progressContainer}>
      <Bold variant="labelSmall">
        {i18n.t(['labels', 'goal']).toUpperCase()}
      </Bold>
      <View style={style.progressGoal}>
        <Goal addiction={addiction} goal={goal} />
      </View>
    </View>
  );
};

export { Progress };

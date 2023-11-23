import { FC } from 'react';
import { View } from 'react-native';

import { Loading } from '@/components/screens/Loading';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import { AchievementsScreenProps } from '@/navigation/types';

interface AchievementsProps {
  addiction: Addiction;
}

const Achievements: FC<AchievementsProps> = ({ addiction }) => {
  return <View />;
};

const AchievementsScreen: FC<AchievementsScreenProps> = ({ route }) => {
  const { id } = route.params;
  const addiction = useAddiction({ id });

  if (!addiction) {
    return <Loading />;
  }

  return <Achievements addiction={addiction} />;
};

export { AchievementsScreen };

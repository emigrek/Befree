import { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { Loading } from '@/components/screens/Loading';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import useLongestAbsence from '@/hooks/addiction/useLongestAbsence';
import { AchievementsScreenProps } from '@/navigation/types';

interface AchievementsProps {
  addiction: Addiction;
}

const Achievements: FC<AchievementsProps> = ({ addiction }) => {
  const { start, end } = useLongestAbsence({ addiction });
  return (
    <View>
      <Text>{start.toString()}</Text>
      <Text>{end ? end.toString() : new Date().toString()}</Text>
    </View>
  );
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

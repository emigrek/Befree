import { formatDistanceToNow } from 'date-fns';
import { FC } from 'react';
import { FlatList, View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';

import { Loading } from '@/components/screens/Loading';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import { Achivement } from '@/hooks/goal/types';
import { useAchivements } from '@/hooks/goal/useAchivements';
import { AchievementsScreenProps } from '@/navigation/types';

interface AchievementsProps {
  addiction: Addiction;
}

const Achievements: FC<AchievementsProps> = ({ addiction }) => {
  const achivements = useAchivements({ addiction });

  const renderItem = ({ item }: { item: Achivement }) => {
    return (
      <View>
        <Text>{item.goal.goalType}</Text>
        <ProgressBar progress={item.progress} />
        {item.progress !== 1 && (
          <Text>za {formatDistanceToNow(item.goal.goalAt)}</Text>
        )}
      </View>
    );
  };

  return <FlatList data={achivements} renderItem={renderItem} />;
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

import { useNavigation } from '@react-navigation/native';
import { FC, useCallback, useLayoutEffect, useMemo } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

import { Achievement } from './Achievement';

import { LoadingScreen } from '@/components/screens';
import { ACHIEVEMENT_HEIGHT } from '@/components/ui/Achievement';
import { useAchievements } from '@/hooks/achievement';
import { useAddiction } from '@/hooks/addiction';
import {
  AchievementsScreenProps,
  ModalStackNavigationProp,
} from '@/navigation/types';

interface AchievementsProps {
  addiction: Addiction;
}

const Achievements: FC<AchievementsProps> = ({ addiction }) => {
  const achievements = useAchievements({ addiction });
  const navigation = useNavigation<ModalStackNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: addiction.name,
    });
  }, [addiction, navigation]);

  const renderItem = useMemo(
    () =>
      ({ item }: { item: Achievement }) => (
        <Achievement achievement={item} addiction={addiction} />
      ),
    [addiction],
  );

  const renderDivider = useCallback(() => <Divider />, []);

  return (
    <FlatList
      data={achievements}
      renderItem={renderItem}
      ItemSeparatorComponent={renderDivider}
      getItemLayout={(data, index) => ({
        length: ACHIEVEMENT_HEIGHT,
        offset: ACHIEVEMENT_HEIGHT * index,
        index,
      })}
    />
  );
};

const AchievementsScreen: FC<AchievementsScreenProps> = ({ route }) => {
  const { addictionId } = route.params;
  const addiction = useAddiction({ id: addictionId });

  if (!addiction) {
    return <LoadingScreen />;
  }

  return <Achievements addiction={addiction} />;
};

export { AchievementsScreen };

import { useNavigation } from '@react-navigation/native';
import { FC, useCallback, useLayoutEffect, useMemo } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Divider, TouchableRipple } from 'react-native-paper';

import { Achievement } from './Achievement';

import { LoadingScreen } from '@/components/screens';
import { ACHIEVEMENT_HEIGHT } from '@/components/ui/Achievement';
import { useAddiction } from '@/hooks/addiction';
import { useAchievements } from '@/hooks/goal';
import {
  AchievementsScreenProps,
  ModalStackNavigationProp,
} from '@/navigation/types';
import { useTheme } from '@/theme';

interface AchievementsProps {
  addiction: Addiction;
}

const Achievements: FC<AchievementsProps> = ({ addiction }) => {
  const { colors } = useTheme();
  const achievements = useAchievements({ addiction });
  const navigation = useNavigation<ModalStackNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: addiction.name,
    });
  }, [addiction, navigation]);

  const renderItem = useMemo(
    () =>
      ({ item }: { item: Achievement }) => {
        const handlePress = () => {
          const achieved = item.progress >= 1;

          if (!achieved) return;

          navigation.navigate('Achievement', {
            goalType: item.goal.goalType,
            addictionId: addiction.id,
          });
        };

        return (
          <TouchableRipple
            onPress={handlePress}
            rippleColor={colors.elevation.level3}
          >
            <Achievement
              achievement={item}
              activeColor={colors.primary}
              inactiveColor={colors.outline}
              textColor={colors.text}
              iconBackgroundColor={
                item.progress === 1
                  ? colors.elevation.level5
                  : colors.elevation.level1
              }
            />
          </TouchableRipple>
        );
      },
    [colors, addiction.id, navigation],
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

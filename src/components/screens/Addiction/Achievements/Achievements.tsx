import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import { FC, useCallback, useLayoutEffect, useMemo } from 'react';
import { FlatList } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { Loading } from '@/components/screens/Loading';
import { Achievement, ACHIEVEMENT_HEIGHT } from '@/components/ui/Achievement';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import { Achievement as AchievementType } from '@/hooks/goal/types';
import { useAchievements } from '@/hooks/goal/useAchievements';
import i18n from '@/i18n';
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
  const achivements = useAchievements({ addiction });
  const navigation = useNavigation<ModalStackNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: addiction.name,
    });
  }, [addiction, navigation]);

  const renderItem = useMemo(
    () =>
      ({ item }: { item: AchievementType }) => {
        const { goal, progress, achievedAt } = item;
        const achieved = progress >= 1;
        const title =
          achieved && achievedAt
            ? i18n.t(['modals', 'addiction', 'achievements', 'achieved'], {
                achievedAt: formatDistanceToNow(achievedAt),
              })
            : i18n.t(['modals', 'addiction', 'achievements', 'notAchieved'], {
                goalAt: formatDistanceToNow(goal.goalAt),
              });

        return (
          <Achievement>
            <Achievement.Icon
              name={i18n.t(['goals', goal.goalType]).toUpperCase()}
              color={achieved ? colors.primary : colors.outline}
              size={64}
            />
            <Achievement.Body>
              <Achievement.Title>
                <Text
                  variant="titleMedium"
                  style={{
                    color: achieved ? colors.primary : colors.outline,
                  }}
                >
                  {title}
                </Text>
                {achieved && (
                  <MCI name={'check-circle'} size={20} color={colors.primary} />
                )}
              </Achievement.Title>
              {!achieved && <Achievement.ProgressBar progress={progress} />}
            </Achievement.Body>
          </Achievement>
        );
      },
    [colors.outline, colors.primary],
  );

  const renderDivider = useCallback(() => <Divider />, []);

  return (
    <FlatList
      data={achivements}
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
  const { id } = route.params;
  const addiction = useAddiction({ id });

  if (!addiction) {
    return <Loading />;
  }

  return <Achievements addiction={addiction} />;
};

export { AchievementsScreen };

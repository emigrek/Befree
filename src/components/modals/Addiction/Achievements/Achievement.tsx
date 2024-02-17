import { useNavigation } from '@react-navigation/native';
import { format, formatDistanceToNow } from 'date-fns';
import { FC } from 'react';
import { Text, TouchableRipple } from 'react-native-paper';

import { Achievement as AchievementPrimitive } from '@/components/ui/Achievement';
import i18n from '@/i18n';
import { ModalStackNavigationProp } from '@/navigation/types';
import { useTheme } from '@/theme';

interface AchievementProps {
  achievement: Achievement;
  addiction: Addiction;
}

export const Achievement: FC<AchievementProps> = ({
  addiction,
  achievement,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation<ModalStackNavigationProp>();
  const { goal, achievedAt, progress } = achievement;

  const achieved = progress >= 1;
  const title =
    achieved && achievedAt
      ? i18n.t(['modals', 'addiction', 'achievements', 'achieved'], {
          achievedAt: formatDistanceToNow(achievedAt),
        })
      : i18n.t(['modals', 'addiction', 'achievements', 'notAchieved'], {
          goalAt: formatDistanceToNow(goal.goalAt),
        });

  const handlePress = () => {
    const achieved = achievement.progress >= 1;

    if (!achieved) return;

    navigation.navigate('Achievement', {
      goalType: achievement.goal.goalType,
      addictionId: addiction.id,
    });
  };

  return (
    <TouchableRipple
      onPress={handlePress}
      rippleColor={colors.elevation.level3}
    >
      <AchievementPrimitive>
        <AchievementPrimitive.Icon
          name={i18n.t(['goals', goal.goalType]).toUpperCase()}
          color={achieved ? colors.primary : colors.outline}
          fontSize={10}
          backgroundColor={
            achievement.progress === 1
              ? colors.elevation.level5
              : colors.elevation.level1
          }
        />
        <AchievementPrimitive.Body>
          <AchievementPrimitive.Header>
            <AchievementPrimitive.Title>
              <Text
                variant="bodyLarge"
                style={{ color: achieved ? colors.primary : colors.text }}
              >
                {title}
              </Text>
            </AchievementPrimitive.Title>
            <Text
              variant="labelMedium"
              style={{
                color: colors.outline,
              }}
            >
              {format(goal.goalAt, 'HH:mm, dd/MM/yyyy')}
            </Text>
          </AchievementPrimitive.Header>
          {!achieved && (
            <AchievementPrimitive.ProgressBar progress={progress} />
          )}
        </AchievementPrimitive.Body>
      </AchievementPrimitive>
    </TouchableRipple>
  );
};

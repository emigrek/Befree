import { format, formatDistanceToNow } from 'date-fns';
import { FC } from 'react';
import { Text } from 'react-native-paper';

import { Achievement as AchievementPrimitive } from '@/components/ui/Achievement';
import i18n from '@/i18n';

interface AchievementProps {
  achievement: Achievement;
  activeColor: string;
  inactiveColor: string;
  textColor: string;
  iconBackgroundColor?: string;
}

export const Achievement: FC<AchievementProps> = ({
  achievement,
  activeColor,
  inactiveColor,
  textColor,
  iconBackgroundColor,
}) => {
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

  return (
    <AchievementPrimitive>
      <AchievementPrimitive.Icon
        name={i18n.t(['goals', goal.goalType]).toUpperCase()}
        color={achieved ? activeColor : inactiveColor}
        fontSize={10}
        backgroundColor={iconBackgroundColor}
      />
      <AchievementPrimitive.Body>
        <AchievementPrimitive.Header>
          <AchievementPrimitive.Title>
            <Text
              variant="bodyLarge"
              style={{ color: achieved ? activeColor : textColor }}
            >
              {title}
            </Text>
          </AchievementPrimitive.Title>
          <Text
            variant="labelMedium"
            style={{
              color: inactiveColor,
            }}
          >
            {format(goal.goalAt, 'HH:mm, dd/MM/yyyy')}
          </Text>
        </AchievementPrimitive.Header>
        {!achieved && <AchievementPrimitive.ProgressBar progress={progress} />}
      </AchievementPrimitive.Body>
    </AchievementPrimitive>
  );
};

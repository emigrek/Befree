import { format, formatDistanceToNow } from 'date-fns';
import { FC } from 'react';
import { Text } from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { Achievement as AchievementPrimitive } from '@/components/ui/Achievement';
import { Achievement as AchievementType } from '@/hooks/goal/types';
import i18n from '@/i18n';

interface AchievementProps {
  achievement: AchievementType;
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
        fontSize={12}
        backgroundColor={iconBackgroundColor}
        style={{ elevation: achieved ? 20 : 0 }}
      />
      <AchievementPrimitive.Body>
        <AchievementPrimitive.Header>
          <AchievementPrimitive.Title>
            <Text
              variant="bodyLarge"
              style={{
                color: achieved ? activeColor : textColor,
              }}
            >
              {title}
            </Text>
            {achieved && <MCI name={'check'} size={20} color={activeColor} />}
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

import { format } from 'date-fns';
import { FC } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { Loading } from '../Loading';

import { Achievement as AchievementItem } from '@/components/ui/Achievement';
import { Screen } from '@/components/ui/Screen';
import { Bold } from '@/components/ui/Text';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import { Goals } from '@/hooks/goal/types';
import { useAchievement } from '@/hooks/goal/useAchievement';
import i18n from '@/i18n';
import { AchievementScreenProps } from '@/navigation/types';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const WIDTH = SCREEN_WIDTH / 1.6;
const HEIGHT = 280;

interface AchievementProps {
  addiction: Addiction;
  goalType: Goals;
}

const Achievement: FC<AchievementProps> = ({ addiction, goalType }) => {
  const achievement = useAchievement({ addiction, goalType });
  const { colors } = useTheme();
  const gyroscope = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 60,
  });

  const modalStyle = useAnimatedStyle(() => {
    const { x, y } = gyroscope.sensor.value;

    return {
      transform: [
        {
          perspective: 600,
        },
        {
          rotateX: withSpring(`${-x * 7}deg`),
        },
        {
          rotateY: withSpring(`${-y * 7}deg`),
        },
      ],
    };
  });

  if (!achievement) {
    return <Loading />;
  }

  return (
    <Screen style={[style.container]}>
      <Animated.View
        style={[
          style.modal,
          modalStyle,
          {
            backgroundColor: colors.surfaceDisabled,
          },
        ]}
      >
        <Text variant="titleSmall">{i18n.t(['labels', 'freeFor'])}</Text>
        <AchievementItem.Icon
          name={i18n.t(['goals', achievement.goal.goalType]).toUpperCase()}
          color={colors.primary}
          size={100}
          fontSize={20}
        />
        <Bold variant="headlineLarge">{addiction.name}</Bold>
        <Text variant="bodySmall" style={{ color: colors.outline }}>
          {format(achievement.goal.goalAt, 'HH:mm, dd/MM/yyyy')}
        </Text>
      </Animated.View>
    </Screen>
  );
};

const AchievementScreen: FC<AchievementScreenProps> = ({ route }) => {
  const { addictionId, goalType } = route.params;
  const addiction = useAddiction({ id: addictionId });

  if (!addiction) {
    return <Loading />;
  }

  return <Achievement addiction={addiction} goalType={goalType} />;
};

export { AchievementScreen };

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  modal: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    zIndex: 1,
  },
});

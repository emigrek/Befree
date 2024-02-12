import { Dimensions, StyleSheet, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, {
  AnimatedProps,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { Date } from './Date';

import { Achievement as AchievementItem } from '@/components/ui/Achievement';
import { Bold } from '@/components/ui/Text';

const WIDTH = Dimensions.get('screen').width / 1.6;
const HEIGHT = 280;

interface AchievementModalProps extends AnimatedProps<ViewProps> {}

function AchievementModal({ style, ...props }: AchievementModalProps) {
  const { sensor } = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 60,
  });

  const modalStyle = useAnimatedStyle(() => {
    const { x, y } = sensor.value;

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

  return <Animated.View style={[style, styles.modal, modalStyle]} {...props} />;
}

AchievementModal.Title = Text;
AchievementModal.Icon = AchievementItem.Icon;
AchievementModal.Name = Bold;
AchievementModal.Date = Date;

export { AchievementModal };

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    zIndex: 1,
  },
});

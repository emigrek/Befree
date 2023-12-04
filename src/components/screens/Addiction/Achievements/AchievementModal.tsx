import { format } from 'date-fns';
import { FC } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import { Portal, Text } from 'react-native-paper';
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { Achievement } from '@/components/ui/Achievement';
import { Bold } from '@/components/ui/Text';
import i18n from '@/i18n';
import { useAchievementModal } from '@/store';
import { useTheme } from '@/theme';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const WIDTH = SCREEN_WIDTH / 1.4;
const HEIGHT = 300;

type AchievementModalProps = Partial<ModalProps>;

const AchievementModal: FC<AchievementModalProps> = props => {
  const { visible, setVisible } = useAchievementModal(state => {
    return {
      visible: state.visible,
      setVisible: state.setVisible,
      achievement: state.achievement,
      addiction: state.addiction,
    };
  });

  const handleModalHide = () => {
    setVisible(false);
  };

  return (
    <Portal>
      <Modal
        isVisible={visible}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        onDismiss={handleModalHide}
        onBackdropPress={handleModalHide}
        onBackButtonPress={handleModalHide}
        style={style.modalContainer}
        useNativeDriver
        useNativeDriverForBackdrop
        {...props}
      >
        <ModalContent />
      </Modal>
    </Portal>
  );
};

const ModalContent = () => {
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

  const { achievement, addiction } = useAchievementModal(state => {
    return {
      achievement: state.achievement,
      addiction: state.addiction,
    };
  });

  if (!achievement || !addiction) return null;

  return (
    <Animated.View
      style={[
        style.modal,
        {
          backgroundColor: colors.background,
        },
        modalStyle,
      ]}
    >
      <Text variant="titleSmall">{i18n.t(['labels', 'freeFor'])}</Text>
      <Achievement.Icon
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
  );
};

export { AchievementModal };

const style = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

import { useNavigation } from '@react-navigation/native';
import { FC, useCallback, useLayoutEffect, useMemo } from 'react';
import { FlatList } from 'react-native';
import { Divider, TouchableRipple } from 'react-native-paper';

import { Achievement } from './Achievement';
import { AchievementModal } from './AchievementModal';

import { Loading } from '@/components/screens/Loading';
import { ACHIEVEMENT_HEIGHT } from '@/components/ui/Achievement';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import { Achievement as AchievementType } from '@/hooks/goal/types';
import { useAchievements } from '@/hooks/goal/useAchievements';
import {
  AchievementsScreenProps,
  ModalStackNavigationProp,
} from '@/navigation/types';
import { useAchievementModal } from '@/store';
import { useTheme } from '@/theme';

interface AchievementsProps {
  addiction: Addiction;
}

const Achievements: FC<AchievementsProps> = ({ addiction }) => {
  const { colors } = useTheme();
  const achivements = useAchievements({ addiction });
  const navigation = useNavigation<ModalStackNavigationProp>();

  const { setVisible, setAchievement, setAddiction } = useAchievementModal(
    state => {
      return {
        setVisible: state.setVisible,
        setAchievement: state.setAchievement,
        setAddiction: state.setAddiction,
      };
    },
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: addiction.name,
    });
  }, [addiction, navigation]);

  const renderItem = useMemo(
    () =>
      ({ item }: { item: AchievementType }) => {
        const handlePress = () => {
          const achieved = item.progress >= 1;

          if (!achieved) return;

          setAchievement(item);
          setAddiction(addiction);
          setVisible(true);
        };

        return (
          <TouchableRipple
            onPress={handlePress}
            rippleColor={colors.secondaryContainer}
          >
            <Achievement
              achievement={item}
              activeColor={colors.primary}
              inactiveColor={colors.outline}
              textColor={colors.text}
            />
          </TouchableRipple>
        );
      },
    [
      colors.outline,
      colors.primary,
      colors.text,
      colors.secondaryContainer,
      addiction,
      setAchievement,
      setAddiction,
      setVisible,
    ],
  );

  const renderDivider = useCallback(() => <Divider />, []);

  return (
    <>
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
      <AchievementModal />
    </>
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

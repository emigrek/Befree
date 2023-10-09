import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import {
  AbsenceIndicator,
  GoalProgress,
  Image,
} from '@/components/ui/Addiction';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import i18n from '@/i18n';
import {
  AddictionScreenProps,
  ModalStackNavigationProp,
} from '@/navigation/types';
import { useTheme } from '@/theme';

const Addiction: React.FC<AddictionScreenProps> = ({ route }) => {
  const { id } = route.params;
  const { colors } = useTheme();
  const navigation = useNavigation<ModalStackNavigationProp>();
  const addiction = useAddiction({ id });

  useLayoutEffect(() => {
    if (!addiction) return;
    navigation.setOptions({
      title: addiction.name,
    });
  }, [addiction, navigation]);

  if (!addiction) {
    return null; // todo 404
  }

  return (
    <View style={style.container}>
      <View style={style.imageNameContainer}>
        <Image image={addiction.image} name={addiction.name} size={200} />
        <View style={style.progress}>
          <Text variant="titleMedium">{i18n.t(['labels', 'freeFor'])}</Text>
          <AbsenceIndicator
            addiction={addiction}
            style={{ fontSize: 40, color: colors.primary, marginVertical: 30 }}
          />
          <GoalProgress addiction={addiction} />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  imageNameContainer: {
    marginTop: 15,
    alignItems: 'center',
    gap: 30,
  },
  progress: {
    alignItems: 'center',
  },
});

export { Addiction };

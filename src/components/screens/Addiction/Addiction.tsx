import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Loading } from '@/components/screens/Loading';
import { Image } from '@/components/ui/Addiction';
import { FreeFor } from '@/components/ui/Addiction/FreeFor';
import {
  AddictionScreenProps,
  ModalStackNavigationProp,
} from '@/navigation/types';
import { useAddiction } from '@/services/firestore';
import { useTheme } from '@/theme';

const Addiction: React.FC<AddictionScreenProps> = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation<ModalStackNavigationProp>();
  const { addiction, loading } = useAddiction(id);
  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: addiction?.name ?? undefined,
    });
  }, [addiction, navigation]);

  if (loading) {
    return <Loading />;
  }

  if (!addiction) {
    return null; // todo 404
  }

  return (
    <View style={style.container}>
      <View style={style.imageNameContainer}>
        <Image image={addiction.image} name={addiction.name} size={200} />
        <FreeFor
          addiction={addiction}
          style={{ fontSize: 40, color: colors.primary }}
        />
      </View>
      <View></View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageNameContainer: {
    marginTop: 30,
    alignItems: 'center',
    gap: 40,
  },
});

export { Addiction };

import { useNavigation } from '@react-navigation/native';
import { FC, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { RelapsesList } from './RelapsesList';
import { Timeline } from './Timeline';

import { LoadingScreen } from '@/components/screens';
import { Header } from '@/components/ui/Header';
import { RelapseCreatorFab } from '@/components/ui/RelapseCreatorFab';
import { RelapsesSelectionFabs } from '@/components/ui/RelapsesSelectionFabs';
import { useAddiction, useAddictions } from '@/hooks/addiction';
import i18n from '@/i18n';
import {
  ModalStackNavigationProp,
  RelapsesScreenProps,
} from '@/navigation/types';

interface RelapsesProps {
  addiction: Addiction;
}

const Relapses: FC<RelapsesProps> = ({ addiction }) => {
  const navigation = useNavigation<ModalStackNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: addiction.name,
    });
  }, [addiction, navigation]);

  return (
    <>
      <ScrollView>
        <View style={style.container}>
          <View style={style.sectionContainer}>
            <Header
              description={i18n.t([
                'modals',
                'addiction',
                'relapses',
                'timeline',
                'title',
              ])}
            />
            <Timeline addiction={addiction} />
          </View>
          <View style={style.sectionContainer}>
            <Header
              description={i18n.t([
                'modals',
                'addiction',
                'relapses',
                'list',
                'title',
              ])}
            />
            <RelapsesList addiction={addiction} />
          </View>
        </View>
      </ScrollView>
      <RelapseCreatorFab />
      <RelapsesSelectionFabs addiction={addiction} />
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 6,
    gap: 25,
  },
  sectionContainer: {
    marginTop: 5,
    gap: 10,
  },
});

const RelapsesScreen: FC<RelapsesScreenProps> = ({ route }) => {
  const { addictionId } = route.params;
  const { addictionsLoading } = useAddictions();
  const addiction = useAddiction({ id: addictionId });

  if (!addiction || addictionsLoading) {
    return <LoadingScreen />;
  }

  return <Relapses addiction={addiction} />;
};

export { RelapsesScreen };

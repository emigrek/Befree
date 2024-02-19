import { useNavigation } from '@react-navigation/native';
import { FC, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Relapse as RelapseCard } from '@/components/ui/Relapse';
import { RelapseDeleteAction } from '@/components/ui/RelapseDeleteAction';
import { RelapseEditAction } from '@/components/ui/RelapseEditAction';
import {
  useFormattedRelapseTime,
  useRelapse,
  useRelapseChips,
} from '@/hooks/relapse';
import i18n from '@/i18n';
import {
  ModalStackNavigationProp,
  RelapseScreenProps,
} from '@/navigation/types';
import { Addiction, Relapse as RelapseType } from '@/structures';

interface RelapseProps {
  relapse: RelapseType;
  addiction: Addiction;
}

const Relapse: FC<RelapseProps> = ({ relapse, addiction }) => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const chips = useRelapseChips({ relapse, addiction });
  const { toNow, date } = useFormattedRelapseTime({ relapse });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t(['modals', 'relapse', 'label'], {
        addictionName: addiction.name,
      }),
      headerRight: () => (
        <>
          <RelapseDeleteAction />
          <RelapseEditAction />
        </>
      ),
    });
  }, [navigation, addiction]);

  return (
    <View style={style.screen}>
      <RelapseCard>
        <RelapseCard.Title title={toNow} subtitle={date} />
        <RelapseCard.Content>
          <RelapseCard.Note note={relapse.note} />
          {Boolean(chips.length) && <RelapseCard.ChipsList chips={chips} />}
        </RelapseCard.Content>
      </RelapseCard>
    </View>
  );
};

const RelapseScreen: FC<RelapseScreenProps> = ({ route }) => {
  const { relapseId, addictionId } = route.params;
  const { relapse, addiction } = useRelapse({ addictionId, relapseId });

  if (!relapse || !addiction) {
    return null;
  }

  return <Relapse relapse={relapse} addiction={addiction} />;
};

export { RelapseScreen };

const style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 6,
  },
});

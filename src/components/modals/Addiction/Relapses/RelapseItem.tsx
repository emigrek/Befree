import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';

import { Relapse } from '@/components/ui/Relapse';
import { useFormattedRelapseTime, useRelapseChips } from '@/hooks/relapse';
import { ModalStackNavigationProp } from '@/navigation/types';
import { useRelapsesSelectionStore } from '@/store';

interface RelapseItemProps {
  relapse: Relapse;
  addiction: Addiction;
}

const RelapseItem: FC<RelapseItemProps> = ({ relapse, addiction }) => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const chips = useRelapseChips({ relapse, addiction });
  const { toNow, date } = useFormattedRelapseTime({ relapse });
  const { selected, isSelected, toggleSelected } = useRelapsesSelectionStore(
    state => ({
      selected: state.selected,
      isSelected: state.isSelected(relapse),
      toggleSelected: state.toggle,
    }),
  );
  const startedAtRelapse = relapse.id === 'startedAt';

  const handlePress = useCallback(() => {
    if (selected.length && !startedAtRelapse) {
      toggleSelected(relapse);
      return;
    }

    if (startedAtRelapse) return;

    navigation.navigate('Relapse', {
      relapseId: relapse.id,
      addictionId: addiction.id,
    });
  }, [
    toggleSelected,
    selected,
    startedAtRelapse,
    relapse,
    addiction,
    navigation,
  ]);

  const handleLongPress = useCallback(() => {
    if (selected.length || startedAtRelapse) return;

    toggleSelected(relapse);
  }, [toggleSelected, selected, startedAtRelapse, relapse]);

  return (
    <Relapse
      mode={isSelected ? 'contained' : undefined}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <Relapse.Title title={toNow} subtitle={date} />
      {Boolean(chips.length) && (
        <Relapse.Content>
          <Relapse.ChipsList chips={chips} />
        </Relapse.Content>
      )}
    </Relapse>
  );
};

export { RelapseItem };

import React, { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Chip } from 'react-native-paper';

import { RelapseChip } from '@/hooks/relapse/useRelapseChips';

interface ChipsListProps extends ViewProps {
  chips: RelapseChip[];
}

const ChipsList: FC<ChipsListProps> = ({ chips, style, ...props }) => {
  return (
    <View style={[style, styles.chipList]} {...props}>
      {chips.map((chip, index) => (
        <Chip key={index} icon={chip.icon}>
          {chip.label}
        </Chip>
      ))}
    </View>
  );
};

export { ChipsList };

const styles = StyleSheet.create({
  chipList: {
    flexDirection: 'row',
    gap: 5,
  },
});

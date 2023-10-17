import React from 'react';
import { View } from 'react-native';
import { Divider, RadioButton, Text } from 'react-native-paper';

import { radiosStyle } from './radiosStyle';

import i18n from '@/i18n';
import { useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

const DirectionRadios = () => {
  const { colors } = useTheme();
  const { sorting, setSorting } = useGlobalStore(state => ({
    sorting: state.sorting,
    setSorting: state.setSorting,
  }));

  const handleDirectionChange = (value: string) => {
    const direction = value as 'asc' | 'desc';

    setSorting({ ...sorting, direction });
  };

  return (
    <View style={radiosStyle.container}>
      <Text style={radiosStyle.title} variant="titleLarge">
        {i18n.t(['bottomSheets', 'sorting', 'directionTitle'])}
      </Text>
      <Divider />
      <RadioButton.Group
        value={sorting.direction}
        onValueChange={handleDirectionChange}
      >
        <RadioButton.Item
          labelVariant="bodyLarge"
          labelStyle={{ color: colors.outline }}
          label={i18n.t(['bottomSheets', 'sorting', 'directions', 'asc'])}
          value={'asc'}
        />
        <RadioButton.Item
          labelVariant="bodyLarge"
          labelStyle={{ color: colors.outline }}
          label={i18n.t(['bottomSheets', 'sorting', 'directions', 'desc'])}
          value={'desc'}
        />
      </RadioButton.Group>
    </View>
  );
};

export { DirectionRadios };

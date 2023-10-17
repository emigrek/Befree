import React from 'react';
import { View } from 'react-native';
import { Divider, RadioButton, Text } from 'react-native-paper';

import { radiosStyle } from './radiosStyle';

import i18n from '@/i18n';
import { useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

const FieldRadios = () => {
  const { colors } = useTheme();
  const { sorting, setSorting } = useGlobalStore(state => ({
    sorting: state.sorting,
    setSorting: state.setSorting,
  }));

  const handleFieldChange = (value: string) => {
    const field = value as 'name' | 'lastRelapse' | 'createdAt';

    setSorting({ ...sorting, field });
  };

  return (
    <View style={radiosStyle.container}>
      <Text style={radiosStyle.title} variant="titleLarge">
        {i18n.t(['bottomSheets', 'sorting', 'fieldTitle'])}
      </Text>
      <Divider />
      <RadioButton.Group
        value={sorting.field}
        onValueChange={handleFieldChange}
      >
        <RadioButton.Item
          labelVariant="bodyLarge"
          labelStyle={{ color: colors.outline }}
          label={i18n.t(['bottomSheets', 'sorting', 'fields', 'name'])}
          value={'name'}
        />
        <RadioButton.Item
          labelVariant="bodyLarge"
          labelStyle={{ color: colors.outline }}
          label={i18n.t(['bottomSheets', 'sorting', 'fields', 'lastRelapse'])}
          value={'lastRelapse'}
        />
        <RadioButton.Item
          labelVariant="bodyLarge"
          labelStyle={{ color: colors.outline }}
          label={i18n.t(['bottomSheets', 'sorting', 'fields', 'createdAt'])}
          value={'createdAt'}
        />
      </RadioButton.Group>
    </View>
  );
};

export { FieldRadios };

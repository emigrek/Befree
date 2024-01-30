import React from 'react';
import { View } from 'react-native';
import { Divider, RadioButton, Text } from 'react-native-paper';

import { radiosStyle } from './radiosStyle';

import i18n from '@/i18n';
import { useGlobalStore } from '@/store';
import { SortingField } from '@/store/addictions';
import { useTheme } from '@/theme';

const FieldRadios = () => {
  const { colors } = useTheme();
  const { sorting, setSorting } = useGlobalStore(state => ({
    sorting: state.sorting,
    setSorting: state.setSorting,
  }));

  const handleFieldChange = (value: string) => {
    const field = value as SortingField;

    setSorting({ ...sorting, field });
  };

  return (
    <View style={radiosStyle.container}>
      <Text style={radiosStyle.title} variant="titleLarge">
        {i18n.t(['modals', 'sorting', 'fieldTitle'])}
      </Text>
      <Divider />
      <RadioButton.Group
        value={sorting.field}
        onValueChange={handleFieldChange}
      >
        {Object.keys(SortingField).map((field, index) => (
          <RadioButton.Item
            key={index}
            labelVariant="bodyLarge"
            labelStyle={{ color: colors.outline }}
            label={i18n.t(['modals', 'sorting', 'fields', field])}
            value={field}
          />
        ))}
        {/* <RadioButton.Item
          labelVariant="bodyLarge"
          labelStyle={{ color: colors.outline }}
          label={i18n.t(['modals', 'sorting', 'fields', 'name'])}
          value={'name'}
        />
        <RadioButton.Item
          labelVariant="bodyLarge"
          labelStyle={{ color: colors.outline }}
          label={i18n.t(['modals', 'sorting', 'fields', 'lastRelapse'])}
          value={'lastRelapse'}
        />
        <RadioButton.Item
          labelVariant="bodyLarge"
          labelStyle={{ color: colors.outline }}
          label={i18n.t(['modals', 'sorting', 'fields', 'createdAt'])}
          value={'createdAt'}
        /> */}
      </RadioButton.Group>
    </View>
  );
};

export { FieldRadios };

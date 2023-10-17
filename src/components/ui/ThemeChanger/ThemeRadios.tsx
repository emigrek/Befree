import React from 'react';
import { View } from 'react-native';
import { Divider, RadioButton, Text } from 'react-native-paper';

import { radiosStyle } from './radiosStyle';

import i18n from '@/i18n';
import { useGlobalStore } from '@/store';
import { lightsOutMap } from '@/store/theme';
import { useTheme } from '@/theme';

const ThemeRadios = () => {
  const { colors } = useTheme();
  const { lightsOut, setLightsOut } = useGlobalStore(state => ({
    lightsOut: state.lightsOut,
    setLightsOut: state.setLightsOut,
  }));

  const itemLabel = (lightsOut: boolean) => {
    if (lightsOut) return i18n.t(['bottomSheets', 'theme', 'lightsOut']);
    else return i18n.t(['bottomSheets', 'theme', 'dim']);
  };

  return (
    <View style={radiosStyle.container}>
      <Text style={radiosStyle.title} variant="titleLarge">
        {i18n.t(['bottomSheets', 'theme', 'themeTitle'])}
      </Text>
      <Divider />
      <RadioButton.Group
        value={lightsOutMap[Number(lightsOut)]}
        onValueChange={v => setLightsOut(v === 'lightsOut')}
      >
        {Object.values(lightsOutMap)
          .map(v => v === 'lightsOut')
          .map((t, i) => (
            <RadioButton.Item
              key={i}
              labelVariant="bodyLarge"
              labelStyle={{ color: colors.outline }}
              label={itemLabel(t)}
              value={lightsOutMap[Number(t)]}
            />
          ))}
      </RadioButton.Group>
    </View>
  );
};

export default ThemeRadios;

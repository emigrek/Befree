import React from 'react';
import { View } from 'react-native';
import { Divider, RadioButton, Text } from 'react-native-paper';

import { radiosStyle } from './radiosStyle';

import i18n from '@/i18n';
import { useGlobalStore } from '@/store';
import { Theme, Themes } from '@/store/theme';
import { useTheme } from '@/theme';

const ModeRadios = () => {
  const { colors } = useTheme();
  const { theme, setTheme } = useGlobalStore(state => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }));

  const itemLabel = (mode: Theme) => {
    if (mode === Themes.Light) return i18n.t(['labels', 'off']);
    else if (mode === Themes.Dark) return i18n.t(['labels', 'on']);
    else return i18n.t(['bottomSheets', 'theme', 'device']);
  };

  return (
    <View style={radiosStyle.container}>
      <Text style={radiosStyle.title} variant="titleLarge">
        {i18n.t(['bottomSheets', 'theme', 'modeTitle'])}
      </Text>
      <Divider />
      <RadioButton.Group
        value={theme}
        onValueChange={v => setTheme(v as Theme)}
      >
        {Object.values(Themes)
          .sort()
          .map((t, i) => (
            <RadioButton.Item
              key={i}
              labelVariant="bodyLarge"
              labelStyle={{ color: colors.outline }}
              label={itemLabel(t)}
              value={t}
            />
          ))}
      </RadioButton.Group>
    </View>
  );
};

export default ModeRadios;

import { FC, useCallback, useState } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { ActivityIndicator, List } from 'react-native-paper';

import { AddictionSetting } from './useSettings';

import { useTheme } from '@/theme';
import { hexAlpha } from '@/utils/hexAlpha';

interface SettingProps {
  setting: AddictionSetting;
}

const Setting: FC<SettingProps> = ({ setting }) => {
  const { name, description, left, right, onChange, titleStyle } = setting;
  const [isChanging, setIsChanging] = useState(false);

  const handleSettingChange = useCallback(async () => {
    setIsChanging(true);
    await onChange();
    setIsChanging(false);
  }, [onChange]);

  return (
    <View style={styles.wrapper}>
      {isChanging && (
        <Cover>
          <ActivityIndicator />
        </Cover>
      )}
      <List.Item
        pointerEvents={isChanging ? 'none' : 'auto'}
        title={name}
        description={description}
        left={left}
        right={right}
        onPress={handleSettingChange}
        titleStyle={titleStyle}
      />
    </View>
  );
};

const Cover: FC<ViewProps> = props => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        styles.loadingOverlay,
        {
          backgroundColor: hexAlpha(colors.background, 0.5),
          zIndex: 1,
        },
      ]}
      {...props}
    />
  );
};

export { Setting };

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  loadingOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

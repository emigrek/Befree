import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, List } from 'react-native-paper';

import { AddictionSetting } from './useSettings';

import { useTheme } from '@/theme';
import { hexAlpha } from '@/utils/hexAlpha';

interface SettingProps {
  setting: AddictionSetting;
}

const Setting: FC<SettingProps> = ({ setting }) => {
  const { colors } = useTheme();
  const { name, description, left, right, onChange } = setting;
  const [isChanging, setIsChanging] = useState(false);

  const handleSettingChange = useCallback(async () => {
    setIsChanging(true);
    await onChange();
    setIsChanging(false);
  }, [onChange]);

  return (
    <View style={styles.wrapper}>
      {isChanging && (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.loadingOverlay,
            {
              backgroundColor: hexAlpha(colors.background, 0.5),
              zIndex: 1,
            },
          ]}
        >
          <ActivityIndicator />
        </View>
      )}
      <List.Item
        pointerEvents={isChanging ? 'none' : 'auto'}
        title={name}
        description={description}
        left={left}
        right={right}
        onPress={handleSettingChange}
      />
    </View>
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

import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import { SortingAction } from '@/components/ui/SortingAction';
import i18n from '@/i18n';

const HeaderSurface: FC = () => {
  return (
    <Surface elevation={0} style={style.header}>
      <View style={{ flex: 1 }}>
        <Text variant={'bodyMedium'} style={{ marginLeft: 5 }}>
          {i18n.t(['screens', 'addictions', 'commitment'])}
        </Text>
      </View>
      <SortingAction />
    </Surface>
  );
};

export { HeaderSurface };

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    gap: 10,
  },
});

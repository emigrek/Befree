import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';

import { SortingAction } from '@/components/ui/SortingAction';

const HeaderSurface: FC = () => {
  return (
    <Surface elevation={0} style={style.header}>
      <View style={{ flex: 1 }} />
      <SortingAction />
    </Surface>
  );
};

export { HeaderSurface };

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
});

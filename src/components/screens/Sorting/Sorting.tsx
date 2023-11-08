import { StyleSheet, View } from 'react-native';

import { DirectionRadios } from './DirectionRadios';
import { FieldRadios } from './FieldRadios';

const SortingScreen = () => {
  return (
    <View style={style.container}>
      <FieldRadios />
      <DirectionRadios />
    </View>
  );
};

export { SortingScreen };

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    gap: 40,
  },
});

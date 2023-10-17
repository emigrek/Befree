import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Portal, useTheme } from 'react-native-paper';

import { DirectionRadios } from './DirectionRadios';
import { FieldRadios } from './FieldRadios';

const SortingAction = () => {
  const { colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleBottomSheetOpen = () => {
    bottomSheetRef.current?.expand();
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  return (
    <>
      <Appbar.Action
        style={style.action}
        icon={'sort'}
        onPress={handleBottomSheetOpen}
      />
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          snapPoints={['33%', '56%']}
          backgroundStyle={{ backgroundColor: colors.background }}
          handleIndicatorStyle={{ backgroundColor: colors.inverseSurface }}
        >
          <View style={style.container}>
            <FieldRadios />
            <DirectionRadios />
          </View>
        </BottomSheet>
      </Portal>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    gap: 80,
  },
  action: {
    margin: 0,
  },
});

export { SortingAction };

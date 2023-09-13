import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Portal } from 'react-native-paper';

import ModeRadios from './ModeRadios';
import ThemeRadios from './ThemeRadios';

import { useTheme } from '@/theme';

const ThemeChanger = () => {
  const { colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['33%', '56%'], []);

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
      <FAB
        icon={'theme-light-dark'}
        mode="flat"
        onPress={handleBottomSheetOpen}
        style={style.fab}
      />
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: colors.background }}
          handleIndicatorStyle={{ backgroundColor: colors.inverseSurface }}
        >
          <View style={style.container}>
            <ModeRadios />
            <ThemeRadios />
          </View>
        </BottomSheet>
      </Portal>
    </>
  );
};

const style = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    gap: 80,
  },
});

export { ThemeChanger };

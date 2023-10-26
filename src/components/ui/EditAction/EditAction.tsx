import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useRoute } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Portal, useTheme } from 'react-native-paper';

import { BottomSheetContent } from './BottomSheetContent';

import { AddictionStackRouteProp } from '@/navigation/types';

const EditAction = () => {
  const { colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const route = useRoute<AddictionStackRouteProp>();

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
        icon={'pencil'}
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
          <BottomSheetContent route={route} />
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

export { EditAction };

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, FAB, Portal, RadioButton, Text } from 'react-native-paper';

import i18n from '@/i18n';
import { useGlobalStore } from '@/store';
import { Theme, Themes } from '@/store/theme';
import { useTheme } from '@/theme';
import { capitalize } from '@/utils';

const ThemeChanger = () => {
  const { theme, setTheme } = useGlobalStore(state => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }));
  const { colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['33%'], []);

  const handleBottomSheetOpen = () => {
    bottomSheetRef.current?.expand();
  };

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.8}
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
            <Text variant="titleLarge">{i18n.t(['labels', 'theme'])}</Text>
            <Divider />
            <View style={style.radioContainer}>
              {Object.values(Themes).map((t, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleThemeChange(t)}
                  style={style.radio}
                >
                  <Text style={style.title} variant={'bodyMedium'}>
                    {capitalize(t)}
                  </Text>
                  <RadioButton
                    status={t === theme ? 'checked' : 'unchecked'}
                    value={t}
                  />
                </TouchableOpacity>
              ))}
            </View>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  radioContainer: {},
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    flex: 1,
  },
});

export { ThemeChanger };

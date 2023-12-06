import { NavigationContainer } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

import { RootStack } from '@/navigation/RootStack';
import { useGlobalStore } from '@/store';
import { AppSlice } from '@/store/app';
import { ThemeSlice } from '@/store/theme';
import { usePersistedStoreHydrationState } from '@/store/usePersistedStoreHydrationState';
import { useTheme } from '@/theme';
import { useStatusBarTheme } from '@/theme/useStatusBarTheme';

SystemUI.setBackgroundColorAsync('transparent');
WebBrowser.maybeCompleteAuthSession();
WebBrowser.warmUpAsync('com.android.chrome');

export default function App() {
  const theme = useTheme();
  const statusBarTheme = useStatusBarTheme();

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(`#5addad`);
  }, [theme]);

  // Prevents white theme flash when Theme store is not hydrated
  const isHydrated = usePersistedStoreHydrationState<ThemeSlice & AppSlice>({
    persistStore: useGlobalStore.persist,
    onFinishHydration: async () => {
      NavigationBar.setBackgroundColorAsync(theme.colors.background);
      await SplashScreen.hideAsync();
    },
  });

  if (!isHydrated) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={theme}>
        <PaperProvider theme={theme}>
          <StatusBar style={statusBarTheme} />
          <RootStack />
        </PaperProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

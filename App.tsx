import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import * as WebBrowser from 'expo-web-browser';
import { User } from 'firebase/auth';
import { useCallback } from 'react';
import { PaperProvider } from 'react-native-paper';

import { Authentication, Loading, Onboarding } from '@/components/screens';
import { useAuthStateListener } from '@/hooks/useAuthStateListener';
import { AuthDrawerStack } from '@/navigation/AuthDrawerStack';
import { useAuthStore, useGlobalStore } from '@/store';
import { AppSlice } from '@/store/app';
import { ThemeSlice } from '@/store/theme';
import { usePersistedStoreHydrationState } from '@/store/usePersistedStoreHydrationState';
import { useTheme } from '@/theme';
import { useStatusBarTheme } from '@/theme/useStatusBarTheme';

SystemUI.setBackgroundColorAsync('transparent');
SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();
WebBrowser.warmUpAsync('com.android.chrome');

function App() {
  const onboarded = useGlobalStore(state => state.onboarded);
  const { user, setUser } = useAuthStore();

  const { loading } = useAuthStateListener({
    onUserChange: useCallback(
      (u: User | null) => {
        setUser(u);
      },
      [setUser],
    ),
  });

  if (loading) return <Loading size={'large'} />;

  if (!onboarded) return <Onboarding />;

  if (!user) return <Authentication />;

  return <AuthDrawerStack />;
}

export default function Wrappers() {
  const theme = useTheme();
  const statusBarTheme = useStatusBarTheme();

  const isHydrated = usePersistedStoreHydrationState<ThemeSlice & AppSlice>({
    persistStore: useGlobalStore.persist,
    onFinishHydration: async () => {
      await SplashScreen.hideAsync();
    },
  });

  if (!isHydrated) return null;

  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={theme}>
        <StatusBar style={statusBarTheme} />
        <App />
      </PaperProvider>
    </NavigationContainer>
  );
}

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

import { Root } from '@/navigation';
import { useGlobalStore } from '@/store';
import { Themes } from '@/store/theme';
import { useDynamicTheme } from '@/theme';

export default function App() {
  const theme = useGlobalStore(state => state.theme);

  const statusBarTheme =
    theme === Themes.System
      ? 'auto'
      : theme === Themes.Light
      ? Themes.Dark
      : Themes.Light;

  return (
    <NavigationContainer theme={useDynamicTheme()}>
      <PaperProvider theme={useDynamicTheme()}>
        <StatusBar style={statusBarTheme} />
        <Root />
      </PaperProvider>
    </NavigationContainer>
  );
}

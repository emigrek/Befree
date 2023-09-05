import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

import Main from '@/main';
import { useThemeStore } from '@/stores/theme';
import { useDynamicTheme } from '@/theme';

export default function App() {
  const theme = useThemeStore(state => state.theme);

  return (
    <PaperProvider theme={useDynamicTheme()}>
      <StatusBar
        style={
          theme === 'system' ? 'auto' : theme === 'light' ? 'dark' : 'light'
        }
      />
      <Main />
    </PaperProvider>
  );
}

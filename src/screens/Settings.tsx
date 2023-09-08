import { signOut } from 'firebase/auth';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Switch, Text } from 'react-native-paper';

import { Screen } from '@/components/Screen';
import { auth } from '@/services/firebase';
import { useGlobalStore } from '@/store';
import { Themes } from '@/store/theme';

const Settings: FC = () => {
  const { theme, setTheme, onboarded, setOnboarded } = useGlobalStore();

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Screen style={style.screen}>
      <View style={style.setting}>
        <Text variant={'titleMedium'}>Theme</Text>
        <View style={style.settingDetails}>
          {Object.values(Themes).map((t, i) => (
            <Button
              key={i}
              mode={theme === t ? 'contained' : 'contained-tonal'}
              onPress={() => setTheme(t)}
            >
              {t}
            </Button>
          ))}
        </View>
      </View>
      <View style={style.setting}>
        <Text variant={'titleMedium'}>Onboarded</Text>
        <View style={style.settingDetails}>
          <Switch value={onboarded} onValueChange={setOnboarded} />
        </View>
      </View>
      <View style={style.setting}>
        <Button mode={'contained'} onPress={handleSignOut}>
          Logout
        </Button>
      </View>
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20,
    paddingHorizontal: 24,
  },
  setting: {
    gap: 10,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingDetails: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
});

export { Settings };

import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import { Screen } from '@/components/ui/Screen';
import i18n from '@/i18n';

interface LockedProps {
  localAuthenticate: () => void;
}

const Locked: FC<LockedProps> = ({ localAuthenticate }) => {
  return (
    <Screen style={styles.screen}>
      <View style={styles.texts}>
        <Text variant={'titleMedium'}>
          {i18n.t(['modals', 'hiddenaddictions', 'locked', 'title'])}
        </Text>
      </View>
      <IconButton
        size={100}
        icon="fingerprint"
        mode="contained"
        onPress={localAuthenticate}
      />
    </Screen>
  );
};

export { Locked };

const styles = StyleSheet.create({
  screen: {
    gap: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texts: {
    alignItems: 'center',
    gap: 5,
  },
});

import { useAssets } from 'expo-asset';
import React from 'react';
import { Image, View } from 'react-native';

import { Bold } from '@/components/ui/Text';
import { useTheme } from '@/theme';

const Logo = () => {
  const { colors } = useTheme();
  const [assets] = useAssets([require('../../../../assets/logo.png')]);

  if (!assets) return null;

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
      }}
    >
      <Bold variant="titleLarge" style={{ color: colors.primary }}>
        Befree
      </Bold>
      <View
        style={{
          width: 22,
          borderRadius: 3,
          height: 30,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: assets[0].uri }}
          style={{ width: 30, aspectRatio: 1, tintColor: colors.background }}
        />
      </View>
    </View>
  );
};

export { Logo };

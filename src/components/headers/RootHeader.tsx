import { StackHeaderProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

import { style } from './style';

import { Logo } from '@/components/ui/Logo';
import { ThemeChanger } from '@/components/ui/ThemeChanger';

const RootHeader: FC<StackHeaderProps> = () => {
  return (
    <Appbar.Header mode={'center-aligned'} style={style.header}>
      <Logo />
      <View style={style.center} />
      <ThemeChanger />
    </Appbar.Header>
  );
};

export { RootHeader };

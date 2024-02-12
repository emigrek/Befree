import { StackHeaderProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

import { style } from './style';

import { Logo } from '@/components/ui/Logo';
import { ThemeChanger } from '@/components/ui/ThemeChanger';

const RootHeader: FC<StackHeaderProps> = ({ options }) => {
  return (
    <Appbar.Header mode={'center-aligned'} style={style.header}>
      <View style={style.container}>
        <Logo />
      </View>
      <View style={style.center} />
      <ThemeChanger />
      {options.headerRight &&
        options.headerRight({
          pressColor: options.headerPressColor,
          tintColor: options.headerTintColor,
        })}
    </Appbar.Header>
  );
};

export { RootHeader };

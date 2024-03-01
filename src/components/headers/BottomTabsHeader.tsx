import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

import { style } from './style';

import { Logo } from '@/components/ui/Logo';
import { ThemeChanger } from '@/components/ui/ThemeChanger';
import { UserMenu } from '@/components/ui/UserMenu';
import { useAuthStore } from '@/store';

const BottomTabsHeader: FC<BottomTabHeaderProps> = ({ options }) => {
  const user = useAuthStore(state => state.user);

  return (
    <Appbar.Header style={style.header}>
      <UserMenu user={user} />
      <View style={style.center}>
        <Logo />
      </View>
      <ThemeChanger />
    </Appbar.Header>
  );
};

export { BottomTabsHeader };

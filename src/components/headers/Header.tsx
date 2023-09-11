import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Text } from 'react-native-paper';

import { UserAvatar } from '../ui/UserAvatar';

import { Logo } from '@/components/ui/Logo';
import { AuthDrawerStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store';
import { useTheme } from '@/theme';

type AuthDrawerStackNavigationProp =
  DrawerNavigationProp<AuthDrawerStackParamList>;

const Header: FC<BottomTabHeaderProps> = ({ options, route }) => {
  const user = useAuthStore(state => state.user);
  const { colors } = useTheme();
  const title = getHeaderTitle(options, route.name);
  const { openDrawer } = useNavigation<AuthDrawerStackNavigationProp>();
  const isHome = title === 'Home';

  return (
    <Appbar.Header
      mode={'center-aligned'}
      style={[
        style.header,
        {
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={style.container}>
        <TouchableOpacity onPress={openDrawer}>
          <UserAvatar user={user} />
        </TouchableOpacity>
        <View style={style.center}>
          {isHome ? (
            <Logo />
          ) : (
            <Text variant={'titleMedium'} style={{ textAlign: 'center' }}>
              {title}
            </Text>
          )}
        </View>
      </View>
    </Appbar.Header>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
  },
});

export { Header };

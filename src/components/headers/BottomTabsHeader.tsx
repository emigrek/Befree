import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Text } from 'react-native-paper';

import { Logo } from '@/components/ui/Logo';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { AuthDrawerStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store';
import { useTheme } from '@/theme';

type AuthDrawerStackNavigationProp =
  DrawerNavigationProp<AuthDrawerStackParamList>;

const BottomTabsHeader: FC<BottomTabHeaderProps> = ({ options, route }) => {
  const user = useAuthStore(state => state.user);
  const { colors } = useTheme();
  const { openDrawer } = useNavigation<AuthDrawerStackNavigationProp>();

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
          <Title options={options} route={route} />
        </View>
        {options.headerRight &&
          options.headerRight({
            pressColor: options.headerPressColor,
            tintColor: options.headerTintColor,
          })}
      </View>
    </Appbar.Header>
  );
};

interface TitleProps {
  options: BottomTabHeaderProps['options'];
  route: BottomTabHeaderProps['route'];
}

const Title: FC<TitleProps> = ({ options, route }) => {
  const title = getHeaderTitle(options, route.name);
  const isHome = route.name === 'Home';

  if (!isHome) {
    return (
      <Text variant={'titleMedium'} style={{ textAlign: 'center' }}>
        {title}
      </Text>
    );
  }

  return <Logo />;
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
  action: {
    margin: 0,
  },
});

export { BottomTabsHeader };

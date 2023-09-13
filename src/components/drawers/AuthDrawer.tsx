import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { signOut } from 'firebase/auth';
import React, { FC } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  Divider,
  Drawer,
  IconButton,
  Title,
  Tooltip,
} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { DrawerItem } from './types';

import { ThemeChanger } from '@/components/ui/ThemeChanger';
import { UserAvatar } from '@/components/ui/UserAvatar';
import i18n from '@/i18n';
import { auth } from '@/services/firebase';
import { useAuthStore } from '@/store';
import { useTheme } from '@/theme';

const items: DrawerItem[] = [
  {
    icon: 'person',
    label: i18n.t(['labels', 'account']),
    onPress: () => {},
  },
];

const AuthDrawer: FC<DrawerContentComponentProps> = props => {
  const user = useAuthStore(state => state.user);
  const { colors } = useTheme();

  const handleSignOut = () => {
    Alert.alert(
      i18n.t(['labels', 'signOut']),
      i18n.t(['labels', 'signOutConfirmationMessage']),
      [
        {
          text: i18n.t(['labels', 'confirm']),
          onPress: () => signOut(auth),
          style: 'destructive',
        },
        {
          text: i18n.t(['labels', 'cancel']),
        },
      ],
    );
  };

  return (
    <>
      <DrawerContentScrollView
        style={{ backgroundColor: colors.background }}
        {...props}
      >
        <View style={style.content}>
          <View style={style.user}>
            <View style={style.userDetails}>
              <UserAvatar size={40} user={user} />
              <Tooltip title={i18n.t(['labels', 'signOut'])}>
                <IconButton onPress={handleSignOut} size={20} icon={'logout'} />
              </Tooltip>
            </View>
            <Title style={style.title}>{user?.displayName}</Title>
            <Divider />
          </View>
          <Drawer.Section showDivider={false}>
            {items.map((item, key) => (
              <Drawer.Item
                key={key}
                label={item.label}
                onPress={item.onPress}
                icon={props => (
                  <Ionicon
                    name={item.icon}
                    color={colors.onBackground}
                    size={props.size}
                  />
                )}
              />
            ))}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <ThemeChanger />
    </>
  );
};

const style = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 5,
    gap: 10,
  },
  user: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 15,
  },
  userDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginVertical: 20,
    fontWeight: 'bold',
  },
});

export { AuthDrawer };

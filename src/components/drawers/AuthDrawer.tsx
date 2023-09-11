import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { signOut } from 'firebase/auth';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Drawer, Title } from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { DrawerItem } from './types';

import { UserAvatar } from '@/components/ui/UserAvatar';
import { auth } from '@/services/firebase';
import { useAuthStore } from '@/store';

const items: DrawerItem[] = [
  {
    icon: 'log-out',
    label: 'Sign out',
    onPress: () => {
      signOut(auth);
    },
  },
];

const AuthDrawer: FC<DrawerContentComponentProps> = props => {
  const user = useAuthStore(state => state.user);

  return (
    <DrawerContentScrollView {...props}>
      <View style={style.content}>
        <View style={style.user}>
          <UserAvatar size={40} user={user} />
          <Title style={style.title}>{user?.displayName}</Title>
        </View>
        <Drawer.Section>
          {items.map((item, key) => (
            <Drawer.Item
              key={key}
              label={item.label}
              onPress={item.onPress}
              icon={props => <Ionicon name={item.icon} size={props.size} />}
            />
          ))}
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

const style = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 5,
  },
  user: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 15,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export { AuthDrawer };

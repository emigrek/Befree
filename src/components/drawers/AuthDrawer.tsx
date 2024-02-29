import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React, { FC, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Title } from 'react-native-paper';

import { UserAvatar } from '@/components/ui/UserAvatar';
import i18n from '@/i18n';
import { NotificationsManager } from '@/services/managers/local';
import { useAddictionsStore, useAuthStore } from '@/store';

const AuthDrawer: FC<DrawerContentComponentProps> = props => {
  const user = useAuthStore(state => state.user);
  const resetAddictionsStore = useAddictionsStore(state => state.reset);
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    Alert.alert(
      i18n.t(['labels', 'signOut']),
      i18n.t(['labels', 'signOutConfirmationMessage']),
      [
        {
          text: i18n.t(['labels', 'confirm']),
          onPress: signOut,
          style: 'destructive',
        },
        {
          text: i18n.t(['labels', 'cancel']),
        },
      ],
    );
  };

  const signOut = async () => {
    setLoading(true);
    await NotificationsManager.getInstance().cancelAllTrigger();
    await auth().signOut();
    await GoogleSignin.revokeAccess();
    resetAddictionsStore();
    setLoading(false);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={style.content}>
        <View style={style.user}>
          <View style={style.userDetails}>
            <UserAvatar size={40} user={user} />
            <Button
              mode="text"
              onPress={handleSignOut}
              loading={loading}
              compact
              icon={'logout'}
            >
              {i18n.t(['labels', 'signOut'])}
            </Button>
          </View>
          <Title style={style.title}>{user?.displayName ?? user?.email}</Title>
        </View>
      </View>
    </DrawerContentScrollView>
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

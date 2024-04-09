import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FC, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Divider, Menu, Text, TouchableRipple } from 'react-native-paper';

import { UserAvatar } from '@/components/ui/UserAvatar';
import i18n from '@/i18n';
import { NotificationsManager } from '@/services/managers/local';
import { useAddictionsStore } from '@/store';

interface UserMenuProps {
  user: FirebaseAuthTypes.User | null;
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const resetAddictionsStore = useAddictionsStore(state => state.reset);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setVisible(true);

  const handleClose = () => setVisible(false);

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
          onPress: handleClose,
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
    handleClose();
  };

  return (
    <Menu
      anchor={
        <TouchableRipple onPress={handleOpen}>
          <UserAvatar user={user} />
        </TouchableRipple>
      }
      visible={visible}
      onDismiss={handleClose}
    >
      <View style={style.userDetailsContainer}>
        <UserAvatar user={user} size={40} />
        <Text>{user?.displayName}</Text>
      </View>
      <Divider />
      <Menu.Item
        onPress={handleSignOut}
        title={i18n.t(['labels', 'signOut'])}
        leadingIcon={'logout'}
        disabled={loading}
      />
    </Menu>
  );
};

export { UserMenu };

const style = StyleSheet.create({
  userDetailsContainer: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});

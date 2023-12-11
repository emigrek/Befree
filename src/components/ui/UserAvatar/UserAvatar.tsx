import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { FC } from 'react';
import { Avatar } from 'react-native-paper';

interface UserImageProps {
  user: FirebaseAuthTypes.User | null;
  size?: number;
}

const UserAvatar: FC<UserImageProps> = ({ user, size = 32 }) => {
  if (!user) return <Avatar.Text size={size} label={'?'} />;

  if (!user.photoURL) {
    if (user.displayName) {
      return <Avatar.Text size={size} label={user.displayName.slice(0, 1)} />;
    } else {
      return <Avatar.Text size={size} label={'?'} />;
    }
  }

  return <Avatar.Image size={size} source={{ uri: user.photoURL }} />;
};

export { UserAvatar };

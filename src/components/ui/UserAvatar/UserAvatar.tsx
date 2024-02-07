import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { FC } from 'react';

import { TextImage } from '@/components/ui/TextImage';

interface UserImageProps {
  user: FirebaseAuthTypes.User | null;
  size?: number;
}

const UserAvatar: FC<UserImageProps> = ({ user, size = 32 }) => {
  const image = user?.photoURL ?? null;
  const name = user?.displayName ?? '';

  return <TextImage image={image} name={name} size={size} />;
};

export { UserAvatar };

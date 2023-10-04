import React, { FC } from 'react';
import { Avatar } from 'react-native-paper';

import { useTheme } from '@/theme';

interface ImageProps {
  image: string | null;
  name: string;
}

const Image: FC<ImageProps> = ({ image, name }) => {
  const { colors } = useTheme();

  if (!image) {
    return (
      <Avatar.Text
        style={{ backgroundColor: colors.secondary }}
        size={80}
        label={name[0] ? name[0].toUpperCase() : '?'}
      />
    );
  }

  return <Avatar.Image size={80} source={{ uri: image }} />;
};

export { Image };

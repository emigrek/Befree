import React, { FC } from 'react';
import { Image as RNImage, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import { style } from './style';

import { useTheme } from '@/theme';

interface ImageProps {
  image: string | null;
  name: string;
  size?: number;
  roundness?: number;
}

const Image: FC<ImageProps> = ({ image, name, size = 66, roundness = 8 }) => {
  const { colors } = useTheme();

  if (!image) {
    return (
      <View style={style.imageContainer}>
        <Avatar.Text
          style={{ backgroundColor: colors.secondary, borderRadius: roundness }}
          size={size}
          label={name
            .split(' ')
            .map(word => word[0])
            .join('')}
        />
      </View>
    );
  }

  return (
    <View style={style.imageContainer}>
      <RNImage
        style={{ borderRadius: roundness }}
        source={{
          uri: image,
        }}
        width={size}
        height={size}
      />
    </View>
  );
};

export { Image };

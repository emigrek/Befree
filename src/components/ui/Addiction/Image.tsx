import React, { FC, useMemo } from 'react';
import { Image as RNImage, View } from 'react-native';
import { Avatar } from 'react-native-paper';

import { useTheme } from '@/theme';

interface ImageProps {
  image: string | null;
  name: string;
  size?: number;
  roundness?: number;
  onTap?: () => void;
}

const Image: FC<ImageProps> = ({
  image,
  name,
  size = 69,
  roundness = 8,
  onTap,
}) => {
  const { colors } = useTheme();

  const imageText = useMemo(() => {
    return name
      .split(' ')
      .map(
        word => (word.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) ? word : word[0]), // EMOJI LABEL SUPPORT
      )
      .join('');
  }, [name]);

  if (!image) {
    return (
      <View onTouchStart={onTap}>
        <Avatar.Text
          style={{ backgroundColor: colors.secondary, borderRadius: roundness }}
          size={size}
          label={imageText}
          labelStyle={{ color: colors.onSecondary }}
        />
      </View>
    );
  }

  return (
    <View onTouchStart={onTap}>
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

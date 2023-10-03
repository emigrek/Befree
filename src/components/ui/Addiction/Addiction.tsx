import React, { FC } from 'react';
import { Image, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { style } from './style';

import { Progress } from '@/components/ui/Progress';
import { Bold } from '@/components/ui/Text';

const Addiction: FC<Addiction> = ({ name, image, startDate }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        style.surface,
        { backgroundColor: `${colors.onPrimaryContainer}18` },
      ]}
    >
      <View style={style.imageContainer}>
        <Image
          style={style.image}
          source={{
            uri: image || 'https://picsum.photos/700',
          }}
        />
      </View>
      <View style={style.textContainer}>
        <Bold variant="titleLarge">{name}</Bold>
        <Progress startDate={startDate} />
      </View>
    </View>
  );
};

export { Addiction };

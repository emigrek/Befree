import React, { FC } from 'react';
import { View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

import { Image } from './Image';
import { Progress } from './Progress';
import { style } from './style';

import { Bold } from '@/components/ui/Text';

const Addiction: FC<Addiction> = ({ name, image, startDate }) => {
  const { colors } = useTheme();

  const freefor = () => {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24) - years * 365);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const y = years ? `${years}y ` : '';
    const d = days ? `${days}d ` : '';
    const h = hours ? `${hours}h ` : '';
    const m = minutes ? `${minutes}m ` : '';
    const s = `${seconds}s`;

    return `${y}${d}${h}${m}${s}`;
  };

  return (
    <Surface
      elevation={0}
      style={[
        style.surface,
        { backgroundColor: colors.onPrimaryContainer + '18' },
      ]}
    >
      <Image image={image} name={name} />
      <View style={style.textContainer}>
        <Text variant={'titleSmall'}>{name}</Text>
        <View style={style.details}>
          <Bold variant="titleLarge" style={{ color: colors.primary }}>
            {freefor()}
          </Bold>
          <Progress startDate={startDate} />
        </View>
      </View>
    </Surface>
  );
};

export { Addiction };

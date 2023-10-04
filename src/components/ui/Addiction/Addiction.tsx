import { formatDistanceToNow } from 'date-fns';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { Image } from './Image';
import { style } from './style';

import { Progress } from '@/components/ui/Progress';
import { Bold } from '@/components/ui/Text';
import i18n from '@/i18n';

const Addiction: FC<Addiction> = ({ name, image, startDate }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        style.surface,
        { backgroundColor: `${colors.onPrimaryContainer}12` },
      ]}
    >
      <Image image={image} name={name} />
      <View style={style.textContainer}>
        <Text variant="bodySmall">{name}</Text>
        <View style={style.details}>
          <Bold variant="titleMedium" style={{ color: colors.primary }}>
            {i18n.t(['labels', 'freeFor'], {
              time: formatDistanceToNow(new Date(startDate)),
            })}
          </Bold>
          <Progress startDate={startDate} />
        </View>
      </View>
    </View>
  );
};

export { Addiction };

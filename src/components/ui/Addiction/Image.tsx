import Graphemer from 'graphemer';
import React, { FC, useMemo } from 'react';
import {
  Image as RNImage,
  StyleSheet,
  View,
  ViewProps,
  useWindowDimensions,
} from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme } from '@/theme';

interface ImageProps extends ViewProps {
  image: string | null;
  name: string;
  textImageLetters?: number;
  size?: number;
  roundness?: number;
  onTap?: () => void;
  full?: boolean;
}

const Image: FC<ImageProps> = ({
  image,
  name,
  size = 69,
  roundness = 8,
  full,
  textImageLetters = 2,
  onTap,
  style: propsStyle,
  ...props
}) => {
  const { colors } = useTheme();
  const { fontScale } = useWindowDimensions();

  const text = useMemo(() => {
    const splitter = new Graphemer();

    const splitted = splitter.splitGraphemes(name); // Normalizing multi-char letters
    const firstLetters = [];

    for (const char of splitted) {
      if (firstLetters.length === textImageLetters) {
        break;
      }

      if (char === ' ') {
        continue;
      }

      firstLetters.push(char);
    }

    return firstLetters.join('');
  }, [name, textImageLetters]);

  if (!image) {
    return (
      <View
        style={[
          propsStyle,
          styles.container,
          {
            backgroundColor: colors.secondaryContainer,
            borderRadius: roundness,
          },
          !full
            ? {
                width: size,
                height: size,
              }
            : {
                width: '100%',
                aspectRatio: 1,
              },
        ]}
        onTouchStart={onTap}
        {...props}
      >
        <Text
          style={[
            styles.text,
            {
              color: colors.onSecondaryContainer,
              fontSize: size / 3,
              lineHeight: size / fontScale,
              textTransform: 'uppercase',
            },
          ]}
          numberOfLines={1}
        >
          {text}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        propsStyle,
        styles.container,
        {
          width: !full ? size : '100%',
          height: size,
          borderRadius: roundness,
          overflow: 'hidden',
        },
      ]}
      onTouchStart={onTap}
      {...props}
    >
      <RNImage
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

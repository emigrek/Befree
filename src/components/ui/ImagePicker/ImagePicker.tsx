import * as ExpoImagePicker from 'expo-image-picker';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { Pick } from './Pick';
import { Remove } from './Remove';
import { ImagePickerProvider } from './context';

interface ImagePickerProps extends ViewProps {
  image: string | null;
  options?: ExpoImagePicker.ImagePickerOptions;
  onImageChange?: (image: string | null) => void;
}

function ImagePicker({
  children,
  style,
  image,
  options,
  onImageChange,
  ...props
}: ImagePickerProps) {
  return (
    <ImagePickerProvider
      image={image}
      options={options}
      onImageChange={onImageChange}
    >
      <View style={[style, styles.buttonContainer]} {...props}>
        {children}
      </View>
    </ImagePickerProvider>
  );
}

ImagePicker.Pick = Pick;
ImagePicker.Remove = Remove;

export { ImagePicker };

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
});

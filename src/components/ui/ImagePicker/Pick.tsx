import * as ExpoImagePicker from 'expo-image-picker';
import { FC, useCallback } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

import { useImagePickerContext } from './context';

interface PickProps extends ButtonProps {}

const Pick: FC<PickProps> = props => {
  const { setImage, options, onImageChange } = useImagePickerContext();

  const handlePick = useCallback(
    async (e: GestureResponderEvent) => {
      const result = await ExpoImagePicker.launchImageLibraryAsync(options);
      if (result.canceled) return;
      setImage(result.assets[0].uri);
      onImageChange?.(result.assets[0].uri);
      props.onPress?.(e);
    },
    [options, setImage, onImageChange, props],
  );

  return <Button onPress={handlePick} {...props} />;
};

export { Pick };

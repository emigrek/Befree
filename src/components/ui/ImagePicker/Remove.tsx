import { FC, useCallback } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

import { useImagePickerContext } from './context';

interface RemoveProps extends ButtonProps {}

const Remove: FC<RemoveProps> = props => {
  const { setImage, onImageChange } = useImagePickerContext();

  const handleRemove = useCallback(
    async (e: GestureResponderEvent) => {
      setImage(null);
      onImageChange?.(null);
      props.onPress?.(e);
    },
    [setImage, onImageChange, props],
  );

  return <Button onPress={handleRemove} {...props} />;
};

export { Remove };

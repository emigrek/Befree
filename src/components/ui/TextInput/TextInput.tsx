import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { TextInput as NativeTextInput } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

import { useTheme } from '@/theme';

const TextInput = forwardRef<
  ElementRef<typeof NativeTextInput>,
  ComponentPropsWithoutRef<typeof PaperTextInput>
>((props, ref) => {
  const { colors } = useTheme();

  return (
    <PaperTextInput
      {...props}
      mode="flat"
      contentStyle={{
        backgroundColor: colors.background,
      }}
      underlineStyle={{
        backgroundColor: 'transparent',
      }}
      ref={ref}
    />
  );
});

export { TextInput };

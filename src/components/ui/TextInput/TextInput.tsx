import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { TextInput as NativeTextInput } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

const TextInput = forwardRef<
  ElementRef<typeof NativeTextInput>,
  ComponentPropsWithoutRef<typeof PaperTextInput>
>(({ style, ...props }, ref) => {
  return (
    <PaperTextInput
      {...props}
      mode="flat"
      style={[style, { borderRadius: 4 }]}
      underlineStyle={{
        backgroundColor: 'transparent',
      }}
      ref={ref}
    />
  );
});

export { TextInput };

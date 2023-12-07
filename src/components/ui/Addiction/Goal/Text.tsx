import React, { FC } from 'react';
import { Text as PaperText, TextProps } from 'react-native-paper';

type TextType = TextProps<string>;

const Text: FC<TextType> = ({ variant, ...props }) => {
  return <PaperText variant={variant || 'labelSmall'} {...props} />;
};

export { Text };

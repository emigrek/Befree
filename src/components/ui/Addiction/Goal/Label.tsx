import React, { FC } from 'react';
import { Text, TextProps } from 'react-native-paper';

type LabelProps = TextProps<string>;

const Label: FC<LabelProps> = ({ variant, ...props }) => {
  return <Text variant={variant || 'labelSmall'} {...props} />;
};

export { Label };

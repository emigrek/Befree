import React, { FC } from 'react';
import { Text, TextProps } from 'react-native-paper';

type NameProps = TextProps<string>;

const Name: FC<NameProps> = ({ variant, ...props }) => {
  return <Text variant={variant || 'titleSmall'} {...props} />;
};

export { Name };

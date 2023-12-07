import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';

import { style } from './style';

type BodyProps = ViewProps;

const Body: FC<BodyProps> = ({ style: bodyStyle, ...props }) => {
  return <View style={[bodyStyle, style.body]} {...props} />;
};

export { Body };

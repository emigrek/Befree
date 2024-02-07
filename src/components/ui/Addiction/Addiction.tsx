import React from 'react';
import { View, ViewProps } from 'react-native';

import { Body } from './Body';
import { CountUp } from './CountUp';
import { Goal } from './Goal';
import { Name } from './Name';
import { style } from './style';

import { TextImage as Image } from '@/components/ui/TextImage';

type AddictionProps = ViewProps;

function Addiction({ style: addictionStyle, ...props }: AddictionProps) {
  return <View style={[addictionStyle, style.container]} {...props} />;
}

Addiction.Image = Image;
Addiction.Body = Body;
Addiction.Image = Image;
Addiction.Name = Name;
Addiction.CountUp = CountUp;
Addiction.Goal = Goal;

export { Addiction };

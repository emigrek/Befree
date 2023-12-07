import React from 'react';
import { View, ViewProps } from 'react-native';

import { Label } from './Label';
import { Progress } from './Progress';

import { style } from '@/components/ui/Addiction/style';

type GoalProps = ViewProps;

function Goal({ style: goalStyle, ...props }: GoalProps) {
  return <View style={[goalStyle, style.goalContainer]} {...props} />;
}

Goal.Label = Label;
Goal.Progress = Progress;

export { Goal };

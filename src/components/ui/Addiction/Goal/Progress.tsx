import { View, ViewProps } from 'react-native';

import { Bar } from './Bar';
import { Text } from './Text';

import { style } from '@/components/ui/Addiction/style';

type ProgressProps = ViewProps;

function Progress({ style: progressStyle, ...props }: ProgressProps) {
  return <View style={[progressStyle, style.progressContainer]} {...props} />;
}

Progress.Text = Text;
Progress.Bar = Bar;

export { Progress };

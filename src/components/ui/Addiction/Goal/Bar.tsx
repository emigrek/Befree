import { FC } from 'react';
import { ProgressBar, ProgressBarProps } from 'react-native-paper';

import { style } from '../style';

type BarProps = ProgressBarProps;

const Bar: FC<BarProps> = ({ style: barStyle, ...props }) => {
  return <ProgressBar style={[barStyle, style.bar]} {...props} />;
};

export { Bar };

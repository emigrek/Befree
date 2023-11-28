import { StyleSheet } from 'react-native';
import {
  ProgressBar as PrimitiveProgressBar,
  ProgressBarProps as PrimitiveProgressBarProps,
} from 'react-native-paper';

interface ProgressBarProps extends PrimitiveProgressBarProps {}

const ProgressBar: React.FC<ProgressBarProps> = ({
  style: progressBarStyle,
  ...props
}) => {
  return (
    <PrimitiveProgressBar
      style={[style.progressBar, progressBarStyle]}
      {...props}
    />
  );
};

export { ProgressBar };

const style = StyleSheet.create({
  progressBar: {
    height: 6,
    borderRadius: 10,
  },
});

import { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface BoldProps extends TextProps {}

const Bold: FC<BoldProps> = ({ style, ...props }) => {
  return <Text style={[style, styles.bold]} {...props} />;
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
});

export { Bold };

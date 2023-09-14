import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native-paper';

interface BoldProps extends TextProps<string> {}

const Bold: FC<BoldProps> = ({ style, ...props }) => {
  return <Text style={[style, styles.bold]} {...props} />;
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
});

export { Bold };

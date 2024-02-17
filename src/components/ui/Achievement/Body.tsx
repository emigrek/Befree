import { StyleSheet, View, ViewProps } from 'react-native';

interface BodyProps extends ViewProps {}

const Body: React.FC<BodyProps> = ({ style: bodyStyle, ...props }) => {
  return <View style={[style.body, bodyStyle]} {...props} />;
};

export { Body };

const style = StyleSheet.create({
  body: {
    flex: 1,
    gap: 5,
  },
});

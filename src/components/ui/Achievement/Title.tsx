import { StyleSheet, View, ViewProps } from 'react-native';

interface TitleProps extends ViewProps {}

const Title: React.FC<TitleProps> = ({ style: titleStyle, ...props }) => {
  return <View style={[style.title, titleStyle]} {...props} />;
};

export { Title };

const style = StyleSheet.create({
  title: {
    flexDirection: 'row',
    gap: 5,
  },
});

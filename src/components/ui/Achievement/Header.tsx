import { StyleSheet, View, ViewProps } from 'react-native';

interface HeaderProps extends ViewProps {}

const Header: React.FC<HeaderProps> = ({ style: headerStyle, ...props }) => {
  return <View style={[style.header, headerStyle]} {...props} />;
};

export { Header };

const style = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

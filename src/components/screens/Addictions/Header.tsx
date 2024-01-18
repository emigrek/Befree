import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Surface, SurfaceProps } from 'react-native-paper';

interface HeaderProps extends SurfaceProps {}

const Header: FC<HeaderProps> = ({ style, ...props }) => {
  return <Surface elevation={0} style={[style, styles.header]} {...props} />;
};

export { Header };

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    gap: 10,
  },
});

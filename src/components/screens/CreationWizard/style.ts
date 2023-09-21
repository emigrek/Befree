import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    gap: 30,
  },
  input: {
    width: '100%',
  },
  floating: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  texts: {
    width: '100%',
  },
});

export default style;

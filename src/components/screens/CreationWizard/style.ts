import { Dimensions, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 30,
  },
  input: {
    width: '100%',
  },
  floating: {
    position: 'absolute',
    top: Dimensions.get('window').height - 120,
    right: 0,
    left: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  texts: {
    width: '100%',
  },
  container: {
    position: 'absolute',
    right: 0,
    left: 0,
    paddingHorizontal: 20,
    bottom: '50%',
    gap: 20,
  },
});

export default style;

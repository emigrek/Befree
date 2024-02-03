import { Dimensions, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  input: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePicker: {
    gap: 5,
    justifyContent: 'center',
  },
  floating: {
    position: 'absolute',
    top: Dimensions.get('window').height - 130,
    right: 0,
    left: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  texts: {
    width: '100%',
    textAlign: 'center',
  },
  textsContainer: {
    marginBottom: 5,
    textAlign: 'center',
    width: '100%',
  },
  details: {
    gap: 10,
    width: '90%',
  },
  container: {
    gap: 25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 190,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 148,
    zIndex: -1,
    width: '100%',
  },
  progress: {
    height: 25,
  },
  navigationButtonContent: {
    padding: 6,
  },
});

export default style;

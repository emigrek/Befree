import { Dimensions, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  input: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    backgroundColor: 'red',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    overflow: 'hidden',
  },
  floating: {
    position: 'absolute',
    top: Dimensions.get('window').height - 110,
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
  details: {
    gap: 10,
    width: '90%',
  },
  container: {
    gap: 25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90,
  },
});

export default style;

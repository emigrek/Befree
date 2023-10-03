import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  surface: {
    marginVertical: 7,
    marginHorizontal: 9,
    borderRadius: 15,
    height: 115,
    flexDirection: 'row-reverse',
    overflow: 'hidden',
    paddingVertical: 11,
    paddingHorizontal: 10,
    gap: 50,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'center',
  },
  imageContainer: {
    flex: 0.5,
    borderRadius: 9,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 9,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatlist: {
    paddingVertical: 10,
  },
});

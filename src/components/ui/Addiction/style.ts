import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  surface: {
    marginVertical: 4,
    marginHorizontal: 9,
    borderRadius: 15,
    height: 110,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 9,
    gap: 50,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'center',
    borderRadius: 10,
  },
  imageContainer: {
    flex: 0.4,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 2,
    gap: 10,
  },
  details: {
    gap: 13,
  },
  progressContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatlist: {
    paddingVertical: 4,
  },
});

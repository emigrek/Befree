import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  surface: {
    marginVertical: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 10,
    gap: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'center',
    borderRadius: 10,
  },
  imageContainer: {},
  textContainer: {
    flex: 1,
    gap: 4,
  },
  details: {
    flex: 1,
    gap: 4,
  },
  progressContainer: {
    flexDirection: 'row',
  },
  progressGoal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDetails: {
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  divider: {
    flex: 1,
  },
  progress: {
    width: 120,
    height: 6,
    borderRadius: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatlist: {
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
});

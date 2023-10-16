import { StyleSheet } from 'react-native';

export const ADDICTION_ITEM_HEIGHT = 100;

export const style = StyleSheet.create({
  surface: {
    height: ADDICTION_ITEM_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  textContainer: {
    flex: 1,
  },
  details: {
    gap: 4,
  },
  progressContainer: {
    flexDirection: 'row',
  },
  progressGoal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  goalProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
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
    width: 135,
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

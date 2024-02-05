import { StyleSheet } from 'react-native';

export const ADDICTION_ITEM_HEIGHT = 100;

export const style = StyleSheet.create({
  container: {
    height: ADDICTION_ITEM_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  body: {
    flex: 1,
  },
  details: {
    gap: 4,
  },
  goalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  bar: {
    width: 140,
    height: 8,
    borderRadius: 10,
  },
});

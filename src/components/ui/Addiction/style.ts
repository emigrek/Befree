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
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
  },
  bar: {
    width: 140,
    height: 8,
    borderRadius: 10,
  },
});

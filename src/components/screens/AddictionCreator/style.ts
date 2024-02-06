import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
  },
  dateTimePicker: { width: '100%', gap: 7 },
  imagePicker: {
    marginTop: 10,
    gap: 5,
    justifyContent: 'center',
  },
  imageCardContent: { gap: 5, justifyContent: 'center', alignItems: 'center' },
  nameTimeDateCardContent: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;

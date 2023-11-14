import { FC } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';

type BodyProps = ScrollViewProps;

const Body: FC<BodyProps> = props => {
  return (
    <ScrollView
      contentContainerStyle={style.containerStyle}
      showsHorizontalScrollIndicator={false}
      horizontal
      {...props}
    />
  );
};

export { Body };

const style = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
  },
});

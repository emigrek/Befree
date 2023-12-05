import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type BodyProps = {
  children: React.ReactNode;
};

const Body: FC<BodyProps> = ({ children }) => {
  return (
    <ScrollView contentContainerStyle={style.containerStyle} horizontal>
      {children}
    </ScrollView>
  );
};

export { Body };

const style = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
  },
});

import { FC } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';

import { useTimelineContext } from './context';

type BodyProps = ScrollViewProps;

const Body: FC<BodyProps> = ({ children, style: bodyStyle, ...props }) => {
  const { cellSize, cellMargin } = useTimelineContext();

  return (
    <ScrollView horizontal {...props}>
      <View
        style={[
          style.body,
          bodyStyle,
          {
            height: 8 * (cellSize + cellMargin),
          },
        ]}
      >
        {children}
      </View>
    </ScrollView>
  );
};

export { Body };

const style = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
});

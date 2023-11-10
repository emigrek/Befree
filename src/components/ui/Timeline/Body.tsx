import { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { useTimelineContext } from './context';

type BodyProps = ViewProps;

const Body: FC<BodyProps> = ({ children, style: bodyStyle, ...props }) => {
  const { cellSize, cellMargin } = useTimelineContext();

  return (
    <View
      style={[
        style.body,
        bodyStyle,
        {
          height: cellSize * 8 + cellMargin * 6,
        },
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export { Body };

const style = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
});

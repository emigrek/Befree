import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardContentProps } from 'react-native-paper';

interface ContentProps extends CardContentProps {}

const Content: FC<ContentProps> = ({ style, ...props }) => {
  return <Card.Content style={[style, styles.contentStyle]} {...props} />;
};

export { Content };

const styles = StyleSheet.create({
  contentStyle: {
    gap: 10,
  },
});

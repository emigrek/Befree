import { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { Bold } from '@/components/ui/Text';

interface IconProps extends ViewProps {
  name: string;
  color: string;
  size: number;
  fontSize: number;
  roundness?: number;
  backgroundColor?: string;
}

const Icon: FC<IconProps> = ({
  name,
  color,
  size,
  fontSize,
  roundness = 8,
  backgroundColor = 'transparent',
  style: containerStyle,
  ...props
}) => {
  return (
    <View
      style={[
        style.icon,
        containerStyle,
        {
          backgroundColor: backgroundColor ? backgroundColor : 'transparent',
        },
        {
          width: size,
          height: size,
          borderRadius: roundness,
          justifyContent: 'center',
        },
      ]}
      {...props}
    >
      <MCI name={'trophy'} size={size * 0.55} color={color} />
      <Bold
        style={{
          color,
          fontSize,
        }}
      >
        {name}
      </Bold>
    </View>
  );
};

export { Icon };

const style = StyleSheet.create({
  icon: {
    alignItems: 'center',
  },
});

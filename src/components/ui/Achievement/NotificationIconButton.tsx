import React, { FC } from 'react';
import { IconButton, IconButtonProps } from 'react-native-paper';

interface NotificationIconButtonProps extends IconButtonProps {}

const NotificationIconButton: FC<NotificationIconButtonProps> = ({
  ...props
}) => {
  return <IconButton {...props} />;
};

export { NotificationIconButton };

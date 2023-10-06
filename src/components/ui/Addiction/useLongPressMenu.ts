import { useState } from 'react';

export const useLongPressMenu = () => {
  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const showMenu = (x: number, y: number) => {
    setAnchor({ x, y });
    setVisible(true);
  };

  const hideMenu = () => {
    setVisible(false);
  };

  return {
    visible,
    anchor,
    showMenu,
    hideMenu,
  };
};
